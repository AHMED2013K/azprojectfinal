export function addLeadActivity(lead, { type, label, actor = null, meta = {} }) {
  if (!lead.activityLog) {
    lead.activityLog = [];
  }

  lead.activityLog.unshift({
    type,
    label,
    actor,
    meta,
    createdAt: new Date(),
  });

  if (lead.activityLog.length > 40) {
    lead.activityLog = lead.activityLog.slice(0, 40);
  }

  lead.lastActivityAt = new Date();
}

export function getChangedFields(previousLead, nextValues = {}) {
  return Object.entries(nextValues)
    .filter(([, value]) => value !== undefined)
    .filter(([field, value]) => {
      const previousValue = previousLead[field] ?? '';
      return String(previousValue) !== String(value ?? '');
    })
    .map(([field]) => field);
}
