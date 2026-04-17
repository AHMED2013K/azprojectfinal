import express from 'express';
import multer from 'multer';
import * as XLSX from 'xlsx';
import Lead from '../models/Lead.js';
import SavedLeadFilter from '../models/SavedLeadFilter.js';
import User from '../models/User.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest, notFound } from '../utils/errors.js';
import { LEAD_BUCKETS, LEAD_STATUSES } from '../constants/index.js';
import { serializeLead } from '../utils/serializers.js';
import { createAuditLog } from '../utils/audit.js';
import { bulkLeadsSchema, createLeadSchema, leadQuerySchema, noteSchema, savedLeadFilterSchema, updateLeadSchema } from '../validators/lead.validators.js';
import { assertLeadAccess, buildLeadAccessQuery, isAdmin } from '../utils/access.js';
import { escapeRegExp } from '../utils/security.js';
import { normalizeLeadStatus } from '../utils/leadStatus.js';
import { getLeadMetadataMapCached, invalidateLeadMetadataCache } from '../utils/leadMetadataCache.js';
import { addLeadActivity, getChangedFields } from '../utils/leadActivity.js';
import { assertNoDuplicateLead } from '../utils/leadDuplicates.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

async function loadLead(id) {
  const lead = await Lead.findById(id)
    .populate('createdBy')
    .populate('assignedTo')
    .populate('notes.author')
    .populate('activityLog.actor');

  if (!lead) {
    throw notFound('Lead not found');
  }

  return lead;
}

router.get('/meta/users', asyncHandler(async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const users = await User.find().sort({ name: 1 });
  res.json({ users: users.map((user) => ({ id: user._id.toString(), name: user.name })) });
}));

router.get('/filters', asyncHandler(async (req, res) => {
  const filters = await SavedLeadFilter.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({
    filters: filters.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      search: item.search || '',
      status: item.status || '',
      bucket: item.bucket || 'leads',
      createdAt: item.createdAt,
    })),
  });
}));

router.post('/filters', validate(savedLeadFilterSchema), asyncHandler(async (req, res) => {
  const filter = await SavedLeadFilter.create({
    user: req.user._id,
    name: req.validated.body.name,
    search: req.validated.body.search,
    status: req.validated.body.status,
    bucket: req.validated.body.bucket,
  });

  res.status(201).json({
    filter: {
      id: filter._id.toString(),
      name: filter.name,
      search: filter.search || '',
      status: filter.status || '',
      bucket: filter.bucket || 'leads',
      createdAt: filter.createdAt,
    },
  });
}));

router.delete('/filters/:id', asyncHandler(async (req, res) => {
  const filter = await SavedLeadFilter.findOne({ _id: req.params.id, user: req.user._id });
  if (!filter) {
    throw notFound('Saved filter not found');
  }

  await filter.deleteOne();
  res.json({ message: 'Saved filter deleted' });
}));

function normalizeField(row, aliases) {
  const match = Object.keys(row).find((key) => aliases.includes(String(key).trim().toLowerCase()));
  return match ? row[match] : '';
}

function mapImportedRow(row) {
  return {
    name: String(normalizeField(row, ['name', 'full name']) || '').trim(),
    email: String(normalizeField(row, ['email', 'email address']) || '').trim().toLowerCase(),
    phone: String(normalizeField(row, ['phone', 'phone number', 'mobile']) || '').trim(),
    country: String(normalizeField(row, ['country']) || '').trim(),
    campaign: String(normalizeField(row, ['campaign', 'source campaign']) || '').trim(),
    status: normalizeLeadStatus(String(normalizeField(row, ['status']) || 'New').trim()),
  };
}

function applyStatusTimeline(lead, nextStatus) {
  if (!lead.statusTimeline) {
    lead.statusTimeline = {};
  }

  if (nextStatus === 'Contacted' && !lead.statusTimeline.contactedAt) {
    lead.statusTimeline.contactedAt = new Date();
  }
  if (nextStatus === 'Non Qualified' && !lead.statusTimeline.nonQualifiedAt) {
    lead.statusTimeline.nonQualifiedAt = new Date();
  }
  if (nextStatus === 'Not Interested' && !lead.statusTimeline.notInterestedAt) {
    lead.statusTimeline.notInterestedAt = new Date();
  }
  if (nextStatus === 'Interested' && !lead.statusTimeline.interestedAt) {
    lead.statusTimeline.interestedAt = new Date();
  }
}

async function fetchBucketSummary(query) {
  const [total, newCount, contacted, nonQualified, notInterested, interested] = await Promise.all([
    Lead.countDocuments(query),
    Lead.countDocuments({ ...query, status: 'New' }),
    Lead.countDocuments({ ...query, status: 'Contacted' }),
    Lead.countDocuments({ ...query, status: 'Non Qualified' }),
    Lead.countDocuments({ ...query, status: 'Not Interested' }),
    Lead.countDocuments({ ...query, status: 'Interested' }),
  ]);

  return {
    total,
    newCount,
    contacted,
    nonQualified,
    notInterested,
    interested,
  };
}

function applyBucketFilter(query, bucket) {
  if (bucket === 'leads') {
    return {
      $or: [{ bucket: 'leads' }, { bucket: { $exists: false } }, { bucket: null }, { bucket: '' }],
    };
  }

  return { bucket };
}

function mergeQueryClauses(...clauses) {
  const filteredClauses = clauses.filter((clause) => clause && Object.keys(clause).length);
  if (filteredClauses.length === 0) {
    return {};
  }
  if (filteredClauses.length === 1) {
    return filteredClauses[0];
  }
  return { $and: filteredClauses };
}

router.get('/', validate(leadQuerySchema), asyncHandler(async (req, res) => {
  const { search, status, bucket, page, limit } = req.validated.query;
  const accessQuery = buildLeadAccessQuery(req.user);
  const normalizedBucket = bucket && LEAD_BUCKETS.includes(bucket) ? bucket : 'leads';
  const bucketQuery = applyBucketFilter({}, normalizedBucket);
  const searchQuery = search ? {
    $or: [
      { name: { $regex: escapeRegExp(search), $options: 'i' } },
      { email: { $regex: escapeRegExp(search), $options: 'i' } },
      { country: { $regex: escapeRegExp(search), $options: 'i' } },
      { campaign: { $regex: escapeRegExp(search), $options: 'i' } },
    ],
  } : {};
  const statusQuery = status && LEAD_STATUSES.includes(status)
    ? { status: normalizeLeadStatus(status) }
    : {};

  const query = mergeQueryClauses(accessQuery, bucketQuery, statusQuery, searchQuery);
  const summaryQuery = mergeQueryClauses(accessQuery, bucketQuery);

  const currentPage = page;
  const pageSize = limit;

  const [total, leads, metadataMap, summary] = await Promise.all([
    Lead.countDocuments(query),
    Lead.find(query)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .select('name email phone country campaign source status bucket statusTimeline details lastActivityAt createdAt updatedAt createdBy assignedTo')
      .populate('createdBy')
      .populate('assignedTo')
      .lean(),
    getLeadMetadataMapCached(),
    fetchBucketSummary(summaryQuery),
  ]);

  res.json({
    leads: leads.map((lead) => serializeLead(lead, metadataMap.get(lead._id.toString()))),
    summary,
    pagination: {
      total,
      page: currentPage,
      limit: pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    },
  });
}));

router.post('/', validate(createLeadSchema), asyncHandler(async (req, res) => {
  const { name, email, phone, country, campaign, status, assignedTo } = req.validated.body;
  await assertNoDuplicateLead({ email, phone });

  const lead = await Lead.create({
    name,
    email,
    phone: phone || '',
    country: country || '',
    campaign: campaign || '',
    status: LEAD_STATUSES.includes(normalizeLeadStatus(status)) ? normalizeLeadStatus(status) : 'New',
    createdBy: req.user._id,
    assignedTo: isAdmin(req.user) ? (assignedTo || undefined) : undefined,
  });
  applyStatusTimeline(lead, lead.status);
  addLeadActivity(lead, {
    type: 'lead_created',
    label: 'Lead created manually',
    actor: req.user._id,
    meta: { status: lead.status, campaign: lead.campaign || '' },
  });
  await lead.save();

  const populated = await loadLead(lead._id);
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.created',
    targetType: 'lead',
    targetId: lead._id.toString(),
    details: { status: lead.status, campaign: lead.campaign },
  });
  invalidateLeadMetadataCache();
  const metadataMap = await getLeadMetadataMapCached();
  res.status(201).json({ lead: serializeLead(populated, metadataMap.get(lead._id.toString())) });
}));

router.post('/import', asyncHandler(async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const rows = Array.isArray(req.body.rows) ? req.body.rows : [];
  if (!rows.length) {
    throw badRequest('Import rows are required');
  }

  const dedupedRows = [];
  const seenKeys = new Set();
  rows
    .filter((row) => row.name && row.email)
    .map((row) => ({
      name: row.name,
      email: row.email.toLowerCase(),
      phone: row.phone || '',
      country: row.country || '',
      campaign: row.campaign || '',
      status: LEAD_STATUSES.includes(normalizeLeadStatus(row.status)) ? normalizeLeadStatus(row.status) : 'New',
      source: 'import',
      createdBy: req.user._id,
    }))
    .forEach((row) => {
      const key = `${row.email}:${row.phone || ''}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        dedupedRows.push(row);
      }
    });

  const existingDuplicates = await Promise.all(dedupedRows.map((row) => assertNoDuplicateLead(row).then(() => row).catch(() => null)));
  const validRows = existingDuplicates.filter(Boolean).map((row) => {
    row.lastActivityAt = new Date();
    row.activityLog = [{
      type: 'lead_created',
      label: 'Lead imported in bulk',
      actor: req.user._id,
      meta: { source: 'import', campaign: row.campaign || '' },
      createdAt: new Date(),
    }];
    return row;
  });

  const created = validRows.length ? await Lead.insertMany(validRows) : [];
  invalidateLeadMetadataCache();
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.bulk_import',
    targetType: 'lead',
    details: { count: created.length, mode: 'json' },
  });
  res.status(201).json({ count: created.length, skipped: dedupedRows.length - created.length });
}));

router.post('/import/file', upload.single('file'), asyncHandler(async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (!req.file?.buffer) {
    throw badRequest('A CSV or Excel file is required');
  }

  const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(firstSheet);

  const dedupedRows = [];
  const seenKeys = new Set();
  rows
    .map(mapImportedRow)
    .filter((row) => row.name && row.email)
    .map((row) => ({
      ...row,
      status: LEAD_STATUSES.includes(normalizeLeadStatus(row.status)) ? normalizeLeadStatus(row.status) : 'New',
      source: 'file-import',
      createdBy: req.user._id,
    }))
    .forEach((row) => {
      const key = `${row.email}:${row.phone || ''}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        dedupedRows.push(row);
      }
    });

  const existingDuplicates = await Promise.all(dedupedRows.map((row) => assertNoDuplicateLead(row).then(() => row).catch(() => null)));
  const validRows = existingDuplicates.filter(Boolean).map((row) => {
    row.lastActivityAt = new Date();
    row.activityLog = [{
      type: 'lead_created',
      label: 'Lead imported from file',
      actor: req.user._id,
      meta: { source: 'file-import', campaign: row.campaign || '' },
      createdAt: new Date(),
    }];
    return row;
  });

  const created = validRows.length ? await Lead.insertMany(validRows) : [];
  invalidateLeadMetadataCache();
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.bulk_import',
    targetType: 'lead',
    details: { count: created.length, filename: req.file.originalname, mode: 'file' },
  });

  res.status(201).json({ count: created.length, skipped: dedupedRows.length - created.length, filename: req.file.originalname });
}));

router.get('/export', asyncHandler(async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const leads = await Lead.find().sort({ createdAt: -1 });
  const header = 'Name,Email,Phone,Country,Campaign,Status,Date Added\n';
  const csv = leads.map((lead) => (
    [lead.name, lead.email, lead.phone, lead.country, lead.campaign, lead.status, lead.createdAt.toISOString()]
      .map((value) => `"${String(value || '').replaceAll('"', '""')}"`)
      .join(',')
  ));

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="edugrowth-leads.csv"');
  res.send(header + csv.join('\n'));
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const lead = await loadLead(req.params.id);
  if (!assertLeadAccess(req.user, lead)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const metadataMap = await getLeadMetadataMapCached();
  res.json({ lead: serializeLead(lead, metadataMap.get(lead._id.toString())) });
}));

router.patch('/:id', validate(updateLeadSchema), asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    throw notFound('Lead not found');
  }
  if (!assertLeadAccess(req.user, lead)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await assertNoDuplicateLead({
    email: req.validated.body.email ?? lead.email,
    phone: req.validated.body.phone ?? lead.phone,
  }, lead._id);

  const editableFields = ['name', 'email', 'phone', 'country', 'campaign', 'status', 'bucket'];
  if (isAdmin(req.user)) {
    editableFields.push('assignedTo');
  }

  const changedFields = getChangedFields(lead, req.validated.body);

  editableFields.forEach((field) => {
    if (req.validated.body[field] !== undefined) {
      lead[field] = field === 'status' ? normalizeLeadStatus(req.validated.body[field]) : req.validated.body[field];
    }
  });

  if (req.validated.body.status !== undefined) {
    applyStatusTimeline(lead, normalizeLeadStatus(req.validated.body.status));
  }

  if (changedFields.length) {
    addLeadActivity(lead, {
      type: 'lead_updated',
      label: changedFields.includes('status')
        ? `Status updated to ${lead.status}`
        : 'Lead details updated',
      actor: req.user._id,
      meta: { changedFields, status: lead.status, bucket: lead.bucket },
    });
  }

  await lead.save();
  invalidateLeadMetadataCache();
  const metadataMap = await getLeadMetadataMapCached();
  const populated = await loadLead(lead._id);
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.updated',
    targetType: 'lead',
    targetId: lead._id.toString(),
    details: { status: lead.status, campaign: lead.campaign },
  });
  req.app.get('io').emit('lead:updated', { lead: serializeLead(populated, metadataMap.get(lead._id.toString())) });
  res.json({ lead: serializeLead(populated, metadataMap.get(lead._id.toString())) });
}));

router.post('/:id/notes', validate(noteSchema), asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    throw notFound('Lead not found');
  }
  if (!assertLeadAccess(req.user, lead)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  lead.notes.unshift({
    body: req.validated.body.body,
    author: req.user._id,
  });
  addLeadActivity(lead, {
    type: 'note_added',
    label: 'Note added to lead',
    actor: req.user._id,
    meta: { notePreview: req.validated.body.body.slice(0, 80) },
  });
  await lead.save();

  const populated = await loadLead(lead._id);
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.note_added',
    targetType: 'lead',
    targetId: lead._id.toString(),
  });
  req.app.get('io').emit('lead:note', { leadId: lead._id.toString() });
  res.json({ lead: serializeLead(populated) });
}));

router.post('/bulk', validate(bulkLeadsSchema), asyncHandler(async (req, res) => {
  const { action, leadIds, status, bucket } = req.validated.body;
  const accessQuery = buildLeadAccessQuery(req.user);
  const query = {
    ...accessQuery,
    _id: { $in: leadIds },
  };

  const leads = await Lead.find(query);
  if (!leads.length) {
    throw notFound('No accessible leads found');
  }

  if (action === 'delete' && !isAdmin(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (action === 'status' && !status) {
    throw badRequest('Status is required for this bulk action');
  }

  if (action === 'bucket' && !bucket) {
    throw badRequest('Bucket is required for this bulk action');
  }

  if (action === 'delete') {
    await Lead.deleteMany({ _id: { $in: leads.map((lead) => lead._id) } });
  } else {
    await Promise.all(leads.map(async (lead) => {
      if (action === 'status') {
        lead.status = normalizeLeadStatus(status);
        applyStatusTimeline(lead, lead.status);
        addLeadActivity(lead, {
          type: 'bulk_status_update',
          label: `Status updated in bulk to ${lead.status}`,
          actor: req.user._id,
          meta: { status: lead.status },
        });
      }

      if (action === 'bucket') {
        lead.bucket = bucket;
        addLeadActivity(lead, {
          type: 'bulk_bucket_update',
          label: `Lead moved in bulk to ${bucket}`,
          actor: req.user._id,
          meta: { bucket },
        });
      }

      await lead.save();
    }));
  }

  invalidateLeadMetadataCache();
  await createAuditLog({
    actor: req.user._id,
    action: `lead.bulk_${action}`,
    targetType: 'lead',
    details: { count: leads.length, status: status || '', bucket: bucket || '' },
  });

  res.json({ message: 'Bulk action completed', count: leads.length });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    throw notFound('Lead not found');
  }

  await lead.deleteOne();
  invalidateLeadMetadataCache();
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.deleted',
    targetType: 'lead',
    targetId: req.params.id,
  });
  res.json({ message: 'Lead deleted' });
}));

export default router;
