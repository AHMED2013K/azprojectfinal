export const LEAD_STATUS_OPTIONS = ['New', 'Contacted', 'Non Qualified', 'Not Interested', 'Interested'];

export const LEAD_STATUS_LABELS = {
  New: 'Nouveau',
  Contacted: 'Contacte',
  'Non Qualified': 'Non qualifie',
  'Not Interested': 'Pas interesse',
  Interested: 'Interesse',
};

export const LEAD_BUCKET_LABELS = {
  leads: 'Leads',
  treated: 'Traités',
};

export const QUICK_FILTER_OPTIONS = [
  { key: '', label: 'Tous' },
  { key: 'duplicates', label: 'Doublons' },
  { key: 'overdue', label: 'Taches en retard' },
  { key: 'stale', label: 'Sans activite 3j+' },
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
    { key: 'contacted', label: 'Contactes', value: summary.contacted || 0, percent: buildPercent(summary.contacted || 0), tone: 'from-amber-500/20 to-amber-500/5 text-amber-100' },
    { key: 'nonQualified', label: 'Non qualifies', value: summary.nonQualified || 0, percent: buildPercent(summary.nonQualified || 0), tone: 'from-rose-500/20 to-rose-500/5 text-rose-100' },
    { key: 'notInterested', label: 'Pas interesses', value: summary.notInterested || 0, percent: buildPercent(summary.notInterested || 0), tone: 'from-orange-500/20 to-orange-500/5 text-orange-100' },
    { key: 'interested', label: 'Interesses', value: summary.interested || 0, percent: buildPercent(summary.interested || 0), tone: 'from-emerald-500/20 to-emerald-500/5 text-emerald-100' },
    { key: 'total', label: 'Total leads', value: total, percent: '100%', tone: 'from-cyan-500/20 to-cyan-500/5 text-cyan-100' },
  ];
}
