import Lead from '../models/Lead.js';

function normalizeEmail(value = '') {
  return String(value || '').trim().toLowerCase();
}

function normalizePhone(value = '') {
  return String(value || '').replace(/[^\d]/g, '').trim();
}

function normalizeName(value = '') {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
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
  const normalizedName = normalizeName(payload.name);
  const emailMatches = normalizedEmail
    ? duplicates.filter((item) => normalizeEmail(item.email) === normalizedEmail)
    : [];
  const phoneMatches = normalizedPhone
    ? duplicates.filter((item) => normalizePhone(item.phone) === normalizedPhone)
    : [];
  const strongPhoneMatches = phoneMatches.filter((item) => normalizeName(item.name) === normalizedName);
  const resolvedDuplicates = [
    ...emailMatches,
    ...strongPhoneMatches.filter((item) => !emailMatches.some((entry) => String(entry._id) === String(item._id))),
  ];

  if (emailMatches.length) {
    matchedBy.push('email');
  }
  if (strongPhoneMatches.length) {
    matchedBy.push('phone+name');
  }

  return {
    isDuplicate: resolvedDuplicates.length > 0,
    matchedBy,
    matchedLeadIds: resolvedDuplicates.map((item) => item._id),
    duplicateCount: resolvedDuplicates.length,
    detectedAt: resolvedDuplicates.length ? new Date() : null,
    duplicates: resolvedDuplicates,
  };
}
