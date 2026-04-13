const MONTH_CODES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export function getLeadMonthCode(value) {
  const date = new Date(value);
  return MONTH_CODES[date.getUTCMonth()] || 'UNK';
}

export function buildLeadMetadataMap(leads) {
  const counters = new Map();
  const metadata = new Map();

  [...leads]
    .sort((left, right) => {
      const leftTime = new Date(left.createdAt).getTime();
      const rightTime = new Date(right.createdAt).getTime();
      if (leftTime !== rightTime) {
        return leftTime - rightTime;
      }
      return String(left._id).localeCompare(String(right._id));
    })
    .forEach((lead, index) => {
      const monthCode = getLeadMonthCode(lead.createdAt);
      const monthCount = (counters.get(monthCode) || 0) + 1;
      counters.set(monthCode, monthCount);
      metadata.set(String(lead._id), {
        sequenceNumber: index + 1,
        monthlySequence: monthCount,
        leadCode: `${monthCode}${monthCount}`,
        monthCode,
      });
    });

  return metadata;
}
