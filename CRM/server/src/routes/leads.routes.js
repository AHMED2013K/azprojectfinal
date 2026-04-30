import express from 'express';
import crypto from 'node:crypto';
import path from 'node:path';
import { Readable } from 'node:stream';
import multer from 'multer';
import Papa from 'papaparse';
import readXlsxFile from 'read-excel-file/node';
import Lead from '../models/Lead.js';
import DeletedLead from '../models/DeletedLead.js';
import SavedLeadFilter from '../models/SavedLeadFilter.js';
import User from '../models/User.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest, notFound } from '../utils/errors.js';
import { LEAD_BUCKETS, LEAD_STATUSES } from '../constants/index.js';
import { serializeLead } from '../utils/serializers.js';
import { createAuditLog } from '../utils/audit.js';
import { bulkLeadsSchema, createLeadSchema, leadQuerySchema, mergeLeadSchema, noteSchema, restoreDeletedLeadSchema, savedLeadFilterSchema, taskSchema, updateLeadSchema, updateTaskSchema } from '../validators/lead.validators.js';
import { assertLeadAccess, buildLeadAccessQuery, canEditLeads, canManageWorkspace, isAdmin } from '../utils/access.js';
import { escapeRegExp } from '../utils/security.js';
import { normalizeLeadStatus } from '../utils/leadStatus.js';
import { getLeadMetadataMapCached, invalidateLeadMetadataCache } from '../utils/leadMetadataCache.js';
import { addLeadActivity, getChangedFields } from '../utils/leadActivity.js';
import { buildDuplicateFlag } from '../utils/leadDuplicates.js';
import { calculateLeadScore } from '../utils/leadScore.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

async function loadLead(id) {
  const lead = await Lead.findById(id)
    .populate('createdBy')
    .populate('assignedTo')
    .populate('notes.author')
    .populate('activityLog.actor')
    .populate('tasks.createdBy')
    .populate('tasks.completedBy');

  if (!lead) {
    throw notFound('Lead not found');
  }

  return lead;
}

function clonePlain(value) {
  return JSON.parse(JSON.stringify(value));
}

function getStatusPriority(status = 'New') {
  return {
    New: 0,
    Contacted: 1,
    Unreachable: 2,
    Interested: 3,
    'Not Interested': 4,
    'Non Qualified': 5,
  }[status] ?? 0;
}

async function archiveLeadSnapshot(lead, deletedBy, reason = 'manual-delete') {
  const snapshot = clonePlain(lead.toObject({ depopulate: true }));
  const archived = await DeletedLead.create({
    originalLeadId: lead._id.toString(),
    snapshot,
    deletedBy,
    reason,
    restoreToken: crypto.randomBytes(18).toString('hex'),
  });

  return archived;
}

async function restoreDeletedLeadRecord(deletedLead, restoredBy) {
  if (deletedLead.restoredAt) {
    throw badRequest('This deleted lead has already been restored');
  }

  const existing = await Lead.findById(deletedLead.originalLeadId);
  if (existing) {
    throw badRequest('A lead with this identifier already exists');
  }

  const snapshot = clonePlain(deletedLead.snapshot || {});
  delete snapshot.__v;
  const restoredLead = await Lead.create({
    ...snapshot,
    _id: deletedLead.originalLeadId,
  });

  deletedLead.restoredAt = new Date();
  deletedLead.restoredBy = restoredBy;
  await deletedLead.save();

  return restoredLead;
}

function applyDerivedLeadData(lead) {
  if (!lead) {
    return lead;
  }

  lead.score = calculateLeadScore(lead);
  return lead;
}

async function refreshDuplicateFlagForLead(lead, excludeLeadId = null) {
  const duplicateState = await buildDuplicateFlag({
    email: lead.email,
    phone: lead.phone,
  }, excludeLeadId || lead._id);

  lead.duplicateFlag = {
    isDuplicate: duplicateState.isDuplicate,
    matchedBy: duplicateState.matchedBy,
    matchedLeadIds: duplicateState.matchedLeadIds,
    duplicateCount: duplicateState.duplicateCount,
    detectedAt: duplicateState.detectedAt,
  };

  return duplicateState;
}

async function syncDuplicateFlagForLead(lead) {
  const previousState = JSON.stringify({
    isDuplicate: Boolean(lead.duplicateFlag?.isDuplicate),
    matchedBy: lead.duplicateFlag?.matchedBy || [],
    matchedLeadIds: (lead.duplicateFlag?.matchedLeadIds || []).map((item) => item?.toString?.() || String(item)),
    duplicateCount: lead.duplicateFlag?.duplicateCount || 0,
  });

  const nextState = await refreshDuplicateFlagForLead(lead);
  const currentState = JSON.stringify({
    isDuplicate: Boolean(lead.duplicateFlag?.isDuplicate),
    matchedBy: lead.duplicateFlag?.matchedBy || [],
    matchedLeadIds: (lead.duplicateFlag?.matchedLeadIds || []).map((item) => item?.toString?.() || String(item)),
    duplicateCount: lead.duplicateFlag?.duplicateCount || 0,
  });

  if (previousState !== currentState) {
    await lead.save();
  }

  return nextState;
}

router.get('/meta/users', asyncHandler(async (req, res) => {
  if (!canManageWorkspace(req.user)) {
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
      quickFilter: item.quickFilter || '',
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
    quickFilter: req.validated.body.quickFilter,
  });

  res.status(201).json({
    filter: {
      id: filter._id.toString(),
      name: filter.name,
      search: filter.search || '',
      status: filter.status || '',
      bucket: filter.bucket || 'leads',
      quickFilter: filter.quickFilter || '',
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

function normalizeCellValue(value) {
  if (value == null) {
    return '';
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}

function buildRowsFromMatrix(matrix) {
  if (!Array.isArray(matrix) || !matrix.length) {
    return [];
  }

  const [headerRow = [], ...dataRows] = matrix;
  const headers = headerRow.map((value) => normalizeCellValue(value).trim());
  const rows = [];

  dataRows.forEach((row) => {
    const values = Array.isArray(row) ? row.map(normalizeCellValue) : [];
    if (!headers.length || values.every((value) => !value.trim())) {
      return;
    }

    const entry = {};
    headers.forEach((header, index) => {
      if (header) {
        entry[header] = values[index] ?? '';
      }
    });
    rows.push(entry);
  });

  return rows;
}

async function parseImportRows(file) {
  const extension = path.extname(file.originalname || '').toLowerCase();

  if (extension === '.csv') {
    const parsed = Papa.parse(file.buffer.toString('utf8'), {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    if (parsed.errors.length) {
      throw badRequest('Unable to read the CSV file');
    }

    return parsed.data.map((row) => Object.fromEntries(
      Object.entries(row).map(([key, value]) => [key, normalizeCellValue(value).trim()]),
    ));
  }

  if (extension === '.xlsx') {
    const matrix = await readXlsxFile(Readable.from(file.buffer));
    return buildRowsFromMatrix(matrix);
  }

  throw badRequest('Only CSV and XLSX files are supported');
}

function applyStatusTimeline(lead, nextStatus) {
  if (!lead.statusTimeline) {
    lead.statusTimeline = {};
  }

  if (nextStatus === 'Contacted' && !lead.statusTimeline.contactedAt) {
    lead.statusTimeline.contactedAt = new Date();
  }
  if (nextStatus === 'Unreachable' && !lead.statusTimeline.unreachableAt) {
    lead.statusTimeline.unreachableAt = new Date();
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
  const [total, newCount, contacted, unreachable, nonQualified, notInterested, interested] = await Promise.all([
    Lead.countDocuments(query),
    Lead.countDocuments({ ...query, status: 'New' }),
    Lead.countDocuments({ ...query, status: 'Contacted' }),
    Lead.countDocuments({ ...query, status: 'Unreachable' }),
    Lead.countDocuments({ ...query, status: 'Non Qualified' }),
    Lead.countDocuments({ ...query, status: 'Not Interested' }),
    Lead.countDocuments({ ...query, status: 'Interested' }),
  ]);

  return {
    total,
    newCount,
    contacted,
    unreachable,
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

function buildQuickFilterQuery(quickFilter) {
  const now = new Date();
  const staleCutoff = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000));

  switch (quickFilter) {
    case 'duplicates':
      return { 'duplicateFlag.isDuplicate': true };
    case 'overdue':
      return { tasks: { $elemMatch: { completedAt: null, dueAt: { $lt: now } } } };
    case 'stale':
      return { lastActivityAt: { $lte: staleCutoff } };
    case 'unassigned':
      return {
        $or: [
          { assignedTo: { $exists: false } },
          { assignedTo: null },
        ],
      };
    default:
      return {};
  }
}

router.get('/', validate(leadQuerySchema), asyncHandler(async (req, res) => {
  const { search, status, bucket, quickFilter, assignedTo, page, limit } = req.validated.query;
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
  const quickFilterQuery = buildQuickFilterQuery(quickFilter);
  const assignedToQuery = assignedTo ? { assignedTo } : {};

  const query = mergeQueryClauses(accessQuery, bucketQuery, statusQuery, searchQuery, quickFilterQuery, assignedToQuery);
  const summaryQuery = mergeQueryClauses(accessQuery, bucketQuery, quickFilterQuery, assignedToQuery);

  const currentPage = page;
  const pageSize = limit;

  const [total, leads, metadataMap, summary] = await Promise.all([
    Lead.countDocuments(query),
    Lead.find(query)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .select('name email phone country campaign source status bucket statusTimeline details duplicateFlag tasks notes lastActivityAt createdAt updatedAt createdBy assignedTo')
      .populate('createdBy')
      .populate('assignedTo')
      .populate('tasks.createdBy')
      .populate('tasks.completedBy'),
    getLeadMetadataMapCached(),
    fetchBucketSummary(summaryQuery),
  ]);

  await Promise.all(leads.map((lead) => syncDuplicateFlagForLead(lead)));

  res.json({
    leads: leads.map((lead) => serializeLead(applyDerivedLeadData(lead), metadataMap.get(lead._id.toString()))),
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
  if (!canEditLeads(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { name, email, phone, country, campaign, status, assignedTo } = req.validated.body;

  const lead = await Lead.create({
    name,
    email,
    phone: phone || '',
    country: country || '',
    campaign: campaign || '',
    status: LEAD_STATUSES.includes(normalizeLeadStatus(status)) ? normalizeLeadStatus(status) : 'New',
    createdBy: req.user._id,
    assignedTo: canManageWorkspace(req.user) ? (assignedTo || undefined) : undefined,
  });
  applyStatusTimeline(lead, lead.status);
  await refreshDuplicateFlagForLead(lead);
  addLeadActivity(lead, {
    type: 'lead_created',
    label: 'Lead created manually',
    actor: req.user._id,
    meta: {
      status: lead.status,
      campaign: lead.campaign || '',
      duplicate: Boolean(lead.duplicateFlag?.isDuplicate),
    },
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
  res.status(201).json({ lead: serializeLead(applyDerivedLeadData(populated), metadataMap.get(lead._id.toString())) });
}));

router.post('/import', asyncHandler(async (req, res) => {
  if (!canManageWorkspace(req.user)) {
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

  const validRows = await Promise.all(dedupedRows.map(async (row) => {
    const duplicateState = await buildDuplicateFlag(row);
    row.lastActivityAt = new Date();
    row.duplicateFlag = {
      isDuplicate: duplicateState.isDuplicate,
      matchedBy: duplicateState.matchedBy,
      matchedLeadIds: duplicateState.matchedLeadIds,
      duplicateCount: duplicateState.duplicateCount,
      detectedAt: duplicateState.detectedAt,
    };
    row.activityLog = [{
      type: 'lead_created',
      label: 'Lead imported in bulk',
      actor: req.user._id,
      meta: { source: 'import', campaign: row.campaign || '', duplicate: duplicateState.isDuplicate },
      createdAt: new Date(),
    }];
    return row;
  }));

  const created = validRows.length ? await Lead.insertMany(validRows) : [];
  invalidateLeadMetadataCache();
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.bulk_import',
    targetType: 'lead',
    details: { count: created.length, mode: 'json' },
  });
  res.status(201).json({
    count: created.length,
    skipped: dedupedRows.length - created.length,
    duplicatesFlagged: validRows.filter((row) => row.duplicateFlag?.isDuplicate).length,
  });
}));

router.post('/import/file', upload.single('file'), asyncHandler(async (req, res) => {
  if (!canManageWorkspace(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (!req.file?.buffer) {
    throw badRequest('A CSV or XLSX file is required');
  }

  const rows = await parseImportRows(req.file);

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

  const validRows = await Promise.all(dedupedRows.map(async (row) => {
    const duplicateState = await buildDuplicateFlag(row);
    row.lastActivityAt = new Date();
    row.duplicateFlag = {
      isDuplicate: duplicateState.isDuplicate,
      matchedBy: duplicateState.matchedBy,
      matchedLeadIds: duplicateState.matchedLeadIds,
      duplicateCount: duplicateState.duplicateCount,
      detectedAt: duplicateState.detectedAt,
    };
    row.activityLog = [{
      type: 'lead_created',
      label: 'Lead imported from file',
      actor: req.user._id,
      meta: { source: 'file-import', campaign: row.campaign || '', duplicate: duplicateState.isDuplicate },
      createdAt: new Date(),
    }];
    return row;
  }));

  const created = validRows.length ? await Lead.insertMany(validRows) : [];
  invalidateLeadMetadataCache();
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.bulk_import',
    targetType: 'lead',
    details: { count: created.length, filename: req.file.originalname, mode: 'file' },
  });

  res.status(201).json({
    count: created.length,
    skipped: dedupedRows.length - created.length,
    duplicatesFlagged: validRows.filter((row) => row.duplicateFlag?.isDuplicate).length,
    filename: req.file.originalname,
  });
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
  await syncDuplicateFlagForLead(lead);
  const metadataMap = await getLeadMetadataMapCached();
  res.json({ lead: serializeLead(applyDerivedLeadData(lead), metadataMap.get(lead._id.toString())) });
}));

router.patch('/:id', validate(updateLeadSchema), asyncHandler(async (req, res) => {
  if (!canEditLeads(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    throw notFound('Lead not found');
  }
  if (!assertLeadAccess(req.user, lead)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const editableFields = ['name', 'email', 'phone', 'country', 'campaign', 'status', 'bucket'];
  if (canManageWorkspace(req.user)) {
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
    await refreshDuplicateFlagForLead(lead);
    addLeadActivity(lead, {
      type: 'lead_updated',
      label: changedFields.includes('status')
        ? `Status updated to ${lead.status}`
        : 'Lead details updated',
      actor: req.user._id,
      meta: {
        changedFields,
        status: lead.status,
        bucket: lead.bucket,
        duplicate: Boolean(lead.duplicateFlag?.isDuplicate),
      },
    });
  } else if (req.validated.body.email !== undefined || req.validated.body.phone !== undefined) {
    await refreshDuplicateFlagForLead(lead);
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
  req.app.get('io').emit('lead:updated', { lead: serializeLead(applyDerivedLeadData(populated), metadataMap.get(lead._id.toString())) });
  res.json({ lead: serializeLead(applyDerivedLeadData(populated), metadataMap.get(lead._id.toString())) });
}));

router.post('/:id/notes', validate(noteSchema), asyncHandler(async (req, res) => {
  if (!canEditLeads(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

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
  const metadataMap = await getLeadMetadataMapCached();
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.note_added',
    targetType: 'lead',
    targetId: lead._id.toString(),
  });
  req.app.get('io').emit('lead:note', { leadId: lead._id.toString() });
  res.json({ lead: serializeLead(applyDerivedLeadData(populated), metadataMap.get(lead._id.toString())) });
}));

router.post('/:id/tasks', validate(taskSchema), asyncHandler(async (req, res) => {
  if (!canEditLeads(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    throw notFound('Lead not found');
  }
  if (!assertLeadAccess(req.user, lead)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  lead.tasks.unshift({
    title: req.validated.body.title,
    dueAt: req.validated.body.dueAt,
    createdBy: req.user._id,
  });
  addLeadActivity(lead, {
    type: 'task_added',
    label: 'Follow-up task created',
    actor: req.user._id,
    meta: { title: req.validated.body.title, dueAt: req.validated.body.dueAt },
  });
  await lead.save();

  const populated = await loadLead(lead._id);
  const metadataMap = await getLeadMetadataMapCached();
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.task_added',
    targetType: 'lead',
    targetId: lead._id.toString(),
    details: { dueAt: req.validated.body.dueAt },
  });
  req.app.get('io').emit('lead:updated', { lead: serializeLead(applyDerivedLeadData(populated), metadataMap.get(lead._id.toString())) });
  res.status(201).json({ lead: serializeLead(applyDerivedLeadData(populated), metadataMap.get(lead._id.toString())) });
}));

router.patch('/:id/tasks/:taskId', validate(updateTaskSchema), asyncHandler(async (req, res) => {
  if (!canEditLeads(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    throw notFound('Lead not found');
  }
  if (!assertLeadAccess(req.user, lead)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const task = lead.tasks.id(req.params.taskId);
  if (!task) {
    throw notFound('Task not found');
  }

  if (req.validated.body.completed) {
    task.completedAt = new Date();
    task.completedBy = req.user._id;
  } else {
    task.completedAt = null;
    task.completedBy = null;
  }

  addLeadActivity(lead, {
    type: 'task_updated',
    label: req.validated.body.completed ? 'Follow-up task completed' : 'Follow-up task reopened',
    actor: req.user._id,
    meta: { taskId: req.params.taskId, title: task.title, completed: req.validated.body.completed },
  });
  await lead.save();

  const populated = await loadLead(lead._id);
  const metadataMap = await getLeadMetadataMapCached();
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.task_updated',
    targetType: 'lead',
    targetId: lead._id.toString(),
    details: { taskId: req.params.taskId, completed: req.validated.body.completed },
  });
  req.app.get('io').emit('lead:updated', { lead: serializeLead(applyDerivedLeadData(populated), metadataMap.get(lead._id.toString())) });
  res.json({ lead: serializeLead(applyDerivedLeadData(populated), metadataMap.get(lead._id.toString())) });
}));

router.post('/:id/merge', validate(mergeLeadSchema), asyncHandler(async (req, res) => {
  if (!canManageWorkspace(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const sourceLead = await Lead.findById(req.params.id);
  const targetLead = await Lead.findById(req.validated.body.targetLeadId);
  if (!sourceLead || !targetLead) {
    throw notFound('Lead not found');
  }
  if (sourceLead._id.toString() === targetLead._id.toString()) {
    throw badRequest('Select a different lead to merge into');
  }

  const mergedFields = [];
  ['country', 'campaign', 'phone', 'source'].forEach((field) => {
    if (!targetLead[field] && sourceLead[field]) {
      targetLead[field] = sourceLead[field];
      mergedFields.push(field);
    }
  });

  if (!targetLead.assignedTo && sourceLead.assignedTo) {
    targetLead.assignedTo = sourceLead.assignedTo;
    mergedFields.push('assignedTo');
  }

  if (getStatusPriority(sourceLead.status) > getStatusPriority(targetLead.status)) {
    targetLead.status = sourceLead.status;
    mergedFields.push('status');
  }

  if (sourceLead.bucket === 'treated') {
    targetLead.bucket = 'treated';
    mergedFields.push('bucket');
  }

  const detailFields = ['dateOfBirth', 'age', 'studyField', 'studyLevel', 'alternanceAwareness', 'financialSituation', 'message'];
  targetLead.details = targetLead.details || {};
  sourceLead.details = sourceLead.details || {};
  detailFields.forEach((field) => {
    if (!targetLead.details[field] && sourceLead.details[field]) {
      targetLead.details[field] = sourceLead.details[field];
      mergedFields.push(`details.${field}`);
    }
  });

  targetLead.notes = [...(targetLead.notes || []), ...(sourceLead.notes || [])]
    .sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0));
  targetLead.tasks = [...(targetLead.tasks || []), ...(sourceLead.tasks || [])]
    .sort((left, right) => new Date(left.dueAt || 0) - new Date(right.dueAt || 0));
  targetLead.activityLog = [...(targetLead.activityLog || []), ...(sourceLead.activityLog || [])]
    .sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0))
    .slice(0, 80);

  addLeadActivity(targetLead, {
    type: 'lead_merged',
    label: `Lead merged from ${sourceLead.name}`,
    actor: req.user._id,
    meta: {
      sourceLeadId: sourceLead._id.toString(),
      sourceLeadName: sourceLead.name,
      mergedFields,
    },
  });
  await refreshDuplicateFlagForLead(targetLead, targetLead._id);
  await targetLead.save();

  const archivedSource = await archiveLeadSnapshot(sourceLead, req.user._id, 'merged-into-another-lead');
  await sourceLead.deleteOne();
  invalidateLeadMetadataCache();

  await createAuditLog({
    actor: req.user._id,
    action: 'lead.merged',
    targetType: 'lead',
    targetId: targetLead._id.toString(),
    details: {
      sourceLeadId: sourceLead._id.toString(),
      sourceLeadName: sourceLead.name,
      archivedDeletedLeadId: archivedSource._id.toString(),
      mergedFields,
    },
  });

  const metadataMap = await getLeadMetadataMapCached();
  const populatedTarget = await loadLead(targetLead._id);
  req.app.get('io').emit('lead:updated', { lead: serializeLead(applyDerivedLeadData(populatedTarget), metadataMap.get(targetLead._id.toString())) });
  res.json({
    lead: serializeLead(applyDerivedLeadData(populatedTarget), metadataMap.get(targetLead._id.toString())),
    message: 'Leads merged successfully',
  });
}));

router.post('/bulk', validate(bulkLeadsSchema), asyncHandler(async (req, res) => {
  if (!canEditLeads(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { action, leadIds, status, bucket, assignedTo } = req.validated.body;
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

  if (action === 'assign' && !canManageWorkspace(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (action === 'delete') {
    const archivedDeletedLeads = await Promise.all(leads.map((lead) => archiveLeadSnapshot(lead, req.user._id, 'bulk-delete')));
    await Lead.deleteMany({ _id: { $in: leads.map((lead) => lead._id) } });
    await createAuditLog({
      actor: req.user._id,
      action: 'lead.bulk_delete_archived',
      targetType: 'lead',
      details: {
        count: leads.length,
        deletedLeadIds: archivedDeletedLeads.map((item) => item._id.toString()),
      },
    });
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

      if (action === 'assign') {
        lead.assignedTo = assignedTo || null;
        addLeadActivity(lead, {
          type: 'bulk_assignment_update',
          label: assignedTo ? 'Lead assigned in bulk' : 'Lead unassigned in bulk',
          actor: req.user._id,
          meta: { assignedTo: assignedTo || null },
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
    details: { count: leads.length, status: status || '', bucket: bucket || '', assignedTo: assignedTo || '' },
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

  const deletedLead = await archiveLeadSnapshot(lead, req.user._id, 'manual-delete');
  await lead.deleteOne();
  invalidateLeadMetadataCache();
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.deleted_archived',
    targetType: 'lead',
    targetId: req.params.id,
    details: { deletedLeadId: deletedLead._id.toString() },
  });
  res.json({ message: 'Lead deleted', deletedLeadId: deletedLead._id.toString() });
}));

router.post('/deleted/:deletedLeadId/restore', validate(restoreDeletedLeadSchema), asyncHandler(async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const deletedLead = await DeletedLead.findById(req.params.deletedLeadId);
  if (!deletedLead) {
    throw notFound('Deleted lead not found');
  }

  const restoredLead = await restoreDeletedLeadRecord(deletedLead, req.user._id);
  invalidateLeadMetadataCache();
  await createAuditLog({
    actor: req.user._id,
    action: 'lead.restored',
    targetType: 'lead',
    targetId: restoredLead._id.toString(),
    details: { deletedLeadId: deletedLead._id.toString() },
  });

  const metadataMap = await getLeadMetadataMapCached();
  const populatedLead = await loadLead(restoredLead._id);
  req.app.get('io').emit('lead:updated', { lead: serializeLead(applyDerivedLeadData(populatedLead), metadataMap.get(restoredLead._id.toString())) });
  res.json({
    lead: serializeLead(applyDerivedLeadData(populatedLead), metadataMap.get(restoredLead._id.toString())),
    message: 'Lead restored successfully',
  });
}));

export default router;
