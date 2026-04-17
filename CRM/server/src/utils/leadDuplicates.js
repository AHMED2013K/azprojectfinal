import Lead from '../models/Lead.js';
import { badRequest } from './errors.js';

function normalizeEmail(value = '') {
  return String(value || '').trim().toLowerCase();
}

function normalizePhone(value = '') {
  return String(value || '').replace(/[^\d+]/g, '').trim();
}

export async function findLeadDuplicates({ email = '', phone = '', excludeLeadId = null }) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedPhone = normalizePhone(phone);
  const clauses = [];

  if (normalizedEmail) {
    clauses.push({ email: normalizedEmail });
  }
  if (normalizedPhone) {
    clauses.push({ phone: normalizedPhone });
  }

  if (!clauses.length) {
    return [];
  }

  const query = clauses.length === 1 ? clauses[0] : { $or: clauses };
  if (excludeLeadId) {
    query._id = { $ne: excludeLeadId };
  }

  return Lead.find(query).select('_id name email phone').limit(5).lean();
}

export async function assertNoDuplicateLead(payload, excludeLeadId = null) {
  const duplicates = await findLeadDuplicates(payload, excludeLeadId);
  if (!duplicates.length) {
    return;
  }

  const duplicateNames = duplicates.map((item) => item.name || item.email || item.phone).join(', ');
  throw badRequest(`Duplicate lead detected: ${duplicateNames}`);
}
