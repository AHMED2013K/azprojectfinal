export function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function formatMinutes(totalMinutes = 0) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

export function getLeadStatusTone(status) {
  switch (status) {
    case 'Contacted':
      return 'bg-amber-500/10 text-amber-200 ring-1 ring-amber-400/20';
    case 'Non Qualified':
      return 'bg-rose-500/10 text-rose-200 ring-1 ring-rose-400/20';
    case 'Not Interested':
      return 'bg-orange-500/10 text-orange-200 ring-1 ring-orange-400/20';
    case 'Interested':
      return 'bg-emerald-500/10 text-emerald-200 ring-1 ring-emerald-400/20';
    default:
      return 'bg-fuchsia-500/10 text-fuchsia-200 ring-1 ring-fuchsia-400/20';
  }
}

export function getLeadRowTone(status) {
  switch (status) {
    case 'Contacted':
      return 'bg-amber-500/[0.06]';
    case 'Non Qualified':
      return 'bg-rose-500/[0.06]';
    case 'Not Interested':
      return 'bg-orange-500/[0.06]';
    case 'Interested':
      return 'bg-emerald-500/[0.08]';
    default:
      return 'bg-transparent';
  }
}
