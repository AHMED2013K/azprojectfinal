import Lead from '../models/Lead.js';

function normalizeEmail(value = '') {
  return String(value || '').trim().toLowerCase();
}

function normalizePhone(value = '') {
  return String(value || '').replace(/[^\d]/g, '').trim();
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

  const results = await Lead.find(query).select('_id name email phone').limit(8).lean();
  return excludeLeadId
    ? results.filter((item) => String(item._id) !== String(excludeLeadId))
    : results;
}

export async function buildDuplicateFlag(payload, excludeLeadId = null) {
  const duplicates = await findLeadDuplicates(payload, excludeLeadId);
  const matchedBy = [];
  const normalizedEmail = normalizeEmail(payload.email);
  const emailMatches = normalizedEmail
    ? duplicates.filter((item) => normalizeEmail(item.email) === normalizedEmail)
    : [];
  const resolvedDuplicates = emailMatches;

  if (emailMatches.length) {
    matchedBy.push('email');
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
