import Lead from '../models/Lead.js';

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

export async function buildDuplicateFlag(payload, excludeLeadId = null) {
  const duplicates = await findLeadDuplicates(payload, excludeLeadId);
  const matchedBy = [];
  const normalizedEmail = normalizeEmail(payload.email);
  const normalizedPhone = normalizePhone(payload.phone);

  if (normalizedEmail && duplicates.some((item) => normalizeEmail(item.email) === normalizedEmail)) {
    matchedBy.push('email');
  }
  if (normalizedPhone && duplicates.some((item) => normalizePhone(item.phone) === normalizedPhone)) {
    matchedBy.push('phone');
  }

  return {
    isDuplicate: duplicates.length > 0,
    matchedBy,
    matchedLeadIds: duplicates.map((item) => item._id),
    duplicateCount: duplicates.length,
    detectedAt: duplicates.length ? new Date() : null,
    duplicates,
  };
}
