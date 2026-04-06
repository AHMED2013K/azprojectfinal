import fs from 'node:fs/promises';
import path from 'node:path';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

function parseBirthDate(value) {
  const [day, month, year] = String(value || '').split('/').map((item) => Number(item));
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
  const backupDir = path.join(process.cwd(), 'server', 'backups');
  const backupFile = path.join(backupDir, 'lead-submissions.jsonl');

  await fs.mkdir(backupDir, { recursive: true });
  await fs.appendFile(
    backupFile,
    `${JSON.stringify({
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
    })}\n`,
    'utf8',
  );
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
