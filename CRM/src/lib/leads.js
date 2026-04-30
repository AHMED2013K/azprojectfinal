export const LEAD_STATUS_OPTIONS = ['New', 'Contacted', 'Unreachable', 'Non Qualified', 'Not Interested', 'Interested'];

export const LEAD_STATUS_LABELS = {
  New: 'Nouveau',
  Contacted: 'Contacté',
  Unreachable: 'Injoignable',
  'Non Qualified': 'Non qualifié',
  'Not Interested': 'Pas intéressé',
  Interested: 'Intéressé',
};

export const LEAD_BUCKET_LABELS = {
  leads: 'Leads',
  treated: 'Traités',
};

export const QUICK_FILTER_OPTIONS = [
  { key: '', label: 'Tous' },
  { key: 'duplicates', label: 'Doublons' },
  { key: 'overdue', label: 'Tâches en retard' },
  { key: 'stale', label: 'Sans activité 3j+' },
  { key: 'unassigned', label: 'Non assignes' },
];

export function getLeadStatusLabel(status) {
  return LEAD_STATUS_LABELS[status] || status;
}

export function getBucketMetrics(summary) {
  if (!summary) {
    return [];
  }

  const total = summary.total || 0;
  const buildPercent = (value) => (total ? `${((value / total) * 100).toFixed(1)}%` : '0%');

  return [
    { key: 'newCount', label: 'Nouveaux', value: summary.newCount || 0, percent: buildPercent(summary.newCount || 0), tone: 'from-fuchsia-500/20 to-fuchsia-500/5 text-fuchsia-100' },
    { key: 'contacted', label: 'Contactés', value: summary.contacted || 0, percent: buildPercent(summary.contacted || 0), tone: 'from-amber-500/20 to-amber-500/5 text-amber-100' },
    { key: 'unreachable', label: 'Injoignables', value: summary.unreachable || 0, percent: buildPercent(summary.unreachable || 0), tone: 'from-violet-500/20 to-violet-500/5 text-violet-100' },
    { key: 'nonQualified', label: 'Non qualifiés', value: summary.nonQualified || 0, percent: buildPercent(summary.nonQualified || 0), tone: 'from-rose-500/20 to-rose-500/5 text-rose-100' },
    { key: 'notInterested', label: 'Pas intéressés', value: summary.notInterested || 0, percent: buildPercent(summary.notInterested || 0), tone: 'from-orange-500/20 to-orange-500/5 text-orange-100' },
    { key: 'interested', label: 'Intéressés', value: summary.interested || 0, percent: buildPercent(summary.interested || 0), tone: 'from-emerald-500/20 to-emerald-500/5 text-emerald-100' },
    { key: 'total', label: 'Total leads', value: total, percent: '100%', tone: 'from-cyan-500/20 to-cyan-500/5 text-cyan-100' },
  ];
}
