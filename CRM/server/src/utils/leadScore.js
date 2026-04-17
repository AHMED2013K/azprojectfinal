const SCORE_LABELS = [
  { min: 85, label: 'Hot' },
  { min: 60, label: 'Warm' },
  { min: 35, label: 'Active' },
  { min: 0, label: 'Cold' },
];

export function calculateLeadScore(lead) {
  let value = 15;
  const reasons = [];

  if (lead.status === 'Interested') {
    value += 35;
    reasons.push('Interested status');
  } else if (lead.status === 'Contacted') {
    value += 20;
    reasons.push('Already contacted');
  } else if (lead.status === 'New') {
    value += 10;
    reasons.push('Fresh lead');
  } else {
    value -= 5;
  }

  if (lead.country) {
    value += 5;
    reasons.push('Country filled');
  }
  if (lead.phone) {
    value += 8;
    reasons.push('Phone available');
  }
  if (lead.campaign) {
    value += 6;
    reasons.push('Campaign tagged');
  }
  if (lead.details?.studyLevel) {
    value += 7;
    reasons.push('Study level captured');
  }
  if (lead.details?.financialSituation) {
    value += 7;
    reasons.push('Financial context captured');
  }
  if ((lead.notes || []).length > 0) {
    value += 6;
    reasons.push('Has notes');
  }

  const openTasks = (lead.tasks || []).filter((task) => !task.completedAt);
  if (openTasks.length > 0) {
    value += 8;
    reasons.push('Follow-up scheduled');
  }
  if (openTasks.some((task) => task.dueAt && new Date(task.dueAt) < new Date())) {
    value -= 10;
    reasons.push('Overdue follow-up');
  }

  if (lead.duplicateFlag?.isDuplicate) {
    value -= 12;
    reasons.push('Needs duplicate review');
  }

  const boundedValue = Math.max(0, Math.min(100, value));
  const label = SCORE_LABELS.find((item) => boundedValue >= item.min)?.label || 'Cold';

  return {
    value: boundedValue,
    label,
    reasons,
  };
}
