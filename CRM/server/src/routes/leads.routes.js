import express from 'express';
import multer from 'multer';
import * as XLSX from 'xlsx';
import Lead from '../models/Lead.js';
import User from '../models/User.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest, notFound } from '../utils/errors.js';
import { LEAD_BUCKETS, LEAD_STATUSES } from '../constants/index.js';
import { serializeLead } from '../utils/serializers.js';
import { createAuditLog } from '../utils/audit.js';
import { createLeadSchema, leadQuerySchema, noteSchema, updateLeadSchema } from '../validators/lead.validators.js';
import { assertLeadAccess, buildLeadAccessQuery, isAdmin } from '../utils/access.js';
import { escapeRegExp } from '../utils/security.js';
import { buildLeadMetadataMap } from '../utils/leadMetadata.js';
import { migrateLegacyLeadStatuses, normalizeLeadStatus } from '../utils/leadStatus.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

async function loadLead(id) {
  const lead = await Lead.findById(id)
    .populate('createdBy')
    .populate('assignedTo')
    .populate('notes.author');

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
    query.$or = [...(query.$or || []), { bucket: 'leads' }, { bucket: { $exists: false } }, { bucket: null }, { bucket: '' }];
    return;
  }

  query.bucket = bucket;
}

router.get('/', validate(leadQuerySchema), asyncHandler(async (req, res) => {
  await migrateLegacyLeadStatuses();

  const { search, status, bucket, page, limit } = req.validated.query;
  const query = buildLeadAccessQuery(req.user);
  const summaryQuery = buildLeadAccessQuery(req.user);

  if (status && LEAD_STATUSES.includes(status)) {
    query.status = normalizeLeadStatus(status);
  }

  const normalizedBucket = bucket && LEAD_BUCKETS.includes(bucket) ? bucket : 'leads';
  applyBucketFilter(query, normalizedBucket);
  applyBucketFilter(summaryQuery, normalizedBucket);

  if (search) {
    const safeSearch = escapeRegExp(search);
    query.$or = [
      { name: { $regex: safeSearch, $options: 'i' } },
      { email: { $regex: safeSearch, $options: 'i' } },
      { country: { $regex: safeSearch, $options: 'i' } },
      { campaign: { $regex: safeSearch, $options: 'i' } },
    ];
  }

  const currentPage = page;
  const pageSize = limit;

  const [total, leads, leadIds, summary] = await Promise.all([
    Lead.countDocuments(query),
    Lead.find(query)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .populate('createdBy')
      .populate('assignedTo')
      .populate('notes.author'),
    Lead.find({}, '_id createdAt').sort({ createdAt: 1, _id: 1 }),
    fetchBucketSummary(summaryQuery),
  ]);
  const metadataMap = buildLeadMetadataMap(leadIds);

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
  await migrateLegacyLeadStatuses();

  const { name, email, phone, country, campaign, status, assignedTo } = req.validated.body;

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
  await lead.save();

  const populated = await loadLead(lead._id);
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.created',
    targetType: 'lead',
    targetId: lead._id.toString(),
    details: { status: lead.status, campaign: lead.campaign },
  });
  const metadataMap = buildLeadMetadataMap(await Lead.find({}, '_id createdAt').sort({ createdAt: 1, _id: 1 }));
  res.status(201).json({ lead: serializeLead(populated, metadataMap.get(lead._id.toString())) });
}));

router.post('/import', asyncHandler(async (req, res) => {
  await migrateLegacyLeadStatuses();

  if (!isAdmin(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const rows = Array.isArray(req.body.rows) ? req.body.rows : [];
  if (!rows.length) {
    throw badRequest('Import rows are required');
  }

  const validRows = rows
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
    }));

  const created = await Lead.insertMany(validRows);
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.bulk_import',
    targetType: 'lead',
    details: { count: created.length, mode: 'json' },
  });
  res.status(201).json({ count: created.length });
}));

router.post('/import/file', upload.single('file'), asyncHandler(async (req, res) => {
  await migrateLegacyLeadStatuses();

  if (!isAdmin(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (!req.file?.buffer) {
    throw badRequest('A CSV or Excel file is required');
  }

  const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(firstSheet);

  const validRows = rows
    .map(mapImportedRow)
    .filter((row) => row.name && row.email)
    .map((row) => ({
      ...row,
      status: LEAD_STATUSES.includes(normalizeLeadStatus(row.status)) ? normalizeLeadStatus(row.status) : 'New',
      source: 'file-import',
      createdBy: req.user._id,
    }));

  const created = await Lead.insertMany(validRows);
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.bulk_import',
    targetType: 'lead',
    details: { count: created.length, filename: req.file.originalname, mode: 'file' },
  });

  res.status(201).json({ count: created.length, filename: req.file.originalname });
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
  await migrateLegacyLeadStatuses();

  const lead = await loadLead(req.params.id);
  if (!assertLeadAccess(req.user, lead)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const metadataMap = buildLeadMetadataMap(await Lead.find({}, '_id createdAt').sort({ createdAt: 1, _id: 1 }));
  res.json({ lead: serializeLead(lead, metadataMap.get(lead._id.toString())) });
}));

router.patch('/:id', validate(updateLeadSchema), asyncHandler(async (req, res) => {
  await migrateLegacyLeadStatuses();

  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    throw notFound('Lead not found');
  }
  if (!assertLeadAccess(req.user, lead)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const editableFields = ['name', 'email', 'phone', 'country', 'campaign', 'status', 'bucket'];
  if (isAdmin(req.user)) {
    editableFields.push('assignedTo');
  }

  editableFields.forEach((field) => {
    if (req.validated.body[field] !== undefined) {
      lead[field] = field === 'status' ? normalizeLeadStatus(req.validated.body[field]) : req.validated.body[field];
    }
  });

  if (req.validated.body.status !== undefined) {
    applyStatusTimeline(lead, normalizeLeadStatus(req.validated.body.status));
  }

  await lead.save();
  const metadataMap = buildLeadMetadataMap(await Lead.find({}, '_id createdAt').sort({ createdAt: 1, _id: 1 }));
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

router.delete('/:id', asyncHandler(async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    throw notFound('Lead not found');
  }

  await lead.deleteOne();
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.deleted',
    targetType: 'lead',
    targetId: req.params.id,
  });
  res.json({ message: 'Lead deleted' });
}));

export default router;
