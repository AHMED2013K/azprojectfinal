import AuditLog from '../models/AuditLog.js';

export async function createAuditLog({ actor, action, targetType, targetId = '', details = {} }) {
  await AuditLog.create({
    actor: actor || null,
    action,
    targetType,
    targetId,
    details,
  });
}
