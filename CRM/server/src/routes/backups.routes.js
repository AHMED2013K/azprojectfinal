import express from 'express';
import LeadSubmissionBackup from '../models/LeadSubmissionBackup.js';
import { requireRole } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

function serializeBackup(item) {
  return {
    id: item._id.toString(),
    leadId: item.leadId,
    source: item.source,
    campaign: item.campaign,
    name: item.name,
    email: item.email,
    phone: item.phone,
    country: item.country,
    details: item.details || {},
    meta: item.meta || {},
    backedUpAt: item.backedUpAt,
    createdAt: item.createdAt,
  };
}

router.use(requireRole('admin'));

router.get('/', asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);

  const [total, backups] = await Promise.all([
    LeadSubmissionBackup.countDocuments(),
    LeadSubmissionBackup.find()
      .sort({ backedUpAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
  ]);

  res.json({
    backups: backups.map(serializeBackup),
    summary: {
      latestBackupAt: backups[0]?.backedUpAt || null,
      latestBackupSource: backups[0]?.source || '',
    },
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  });
}));

router.get('/export.json', asyncHandler(async (_req, res) => {
  const backups = await LeadSubmissionBackup.find().sort({ backedUpAt: -1, createdAt: -1 });
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="lead-submission-backups.json"');
  res.send(JSON.stringify(backups.map(serializeBackup), null, 2));
}));

router.get('/export.csv', asyncHandler(async (_req, res) => {
  const backups = await LeadSubmissionBackup.find().sort({ backedUpAt: -1, createdAt: -1 });
  const header = [
    'Backed Up At',
    'Lead ID',
    'Source',
    'Campaign',
    'Name',
    'Email',
    'Phone',
    'Country',
    'Study Field',
    'Study Level',
    'Alternance Awareness',
    'Financial Situation',
    'Date Of Birth',
    'Age',
    'Message',
    'Meta Route',
  ].join(',');

  const rows = backups.map((item) => ([
    item.backedUpAt?.toISOString?.() || '',
    item.leadId || '',
    item.source || '',
    item.campaign || '',
    item.name || '',
    item.email || '',
    item.phone || '',
    item.country || '',
    item.details?.studyField || '',
    item.details?.studyLevel || '',
    item.details?.alternanceAwareness || '',
    item.details?.financialSituation || '',
    item.details?.dateOfBirth || '',
    item.details?.age ?? '',
    item.details?.message || '',
    item.meta?.route || '',
  ].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')));

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="lead-submission-backups.csv"');
  res.send([header, ...rows].join('\n'));
}));

export default router;
