import fs from 'node:fs/promises';
import path from 'node:path';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import LeadSubmissionBackup from '../models/LeadSubmissionBackup.js';

function parseBirthDate(value) {
  const rawValue = String(value || '').trim();
  if (!rawValue) {
    return null;
  }

  const normalizedValue = /^\d{4}-\d{2}-\d{2}$/.test(rawValue)
    ? `${rawValue.slice(8, 10)}/${rawValue.slice(5, 7)}/${rawValue.slice(0, 4)}`
    : rawValue;

  const [day, month, year] = normalizedValue.split('/').map((item) => Number(item));
  if (!day || !month || !year) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function calculateAgeFromBirthDate(value) {
  const birthDate = parseBirthDate(value);
  if (!birthDate) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const beforeBirthday = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate());
  if (beforeBirthday) {
    age -= 1;
  }

  return age >= 0 ? age : null;
}

export async function backupLeadSubmission(lead, meta = {}) {
  const payload = {
    backedUpAt: new Date().toISOString(),
    leadId: lead._id?.toString?.() || '',
    source: lead.source,
    campaign: lead.campaign,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    country: lead.country,
    details: lead.details,
    meta,
  };

  await LeadSubmissionBackup.create({
    ...payload,
    backedUpAt: new Date(payload.backedUpAt),
  });

  const backupDir = path.join(process.cwd(), 'server', 'backups');
  const backupFile = path.join(backupDir, 'lead-submissions.jsonl');

  await fs.mkdir(backupDir, { recursive: true });
  try {
    await fs.appendFile(backupFile, `${JSON.stringify(payload)}\n`, 'utf8');
  } catch (error) {
    console.warn('Lead JSONL backup write failed', error?.message || error);
  }
}

export async function notifyNewLead(req, lead) {
  const users = await User.find({}, '_id');
  if (!users.length) {
    return;
  }

  const title = 'Nouvelle candidature recue';
  const body = `${lead.name} a rempli le formulaire ${lead.campaign || 'public'}.`;
  await Notification.insertMany(users.map((user) => ({
    user: user._id,
    type: 'lead',
    title,
    body,
  })));

  req.app.get('io').emit('notification:new', {
    id: `${lead._id.toString()}-lead-notification`,
    type: 'lead',
    title,
    body,
    createdAt: new Date().toISOString(),
  });
}
