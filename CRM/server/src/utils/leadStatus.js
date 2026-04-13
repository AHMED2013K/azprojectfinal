import Lead from '../models/Lead.js';

const LEGACY_STATUS_MAP = {
  'Not Interested': 'Non Qualified',
  Converted: 'Interested',
};

let migrationPromise;

export function normalizeLeadStatus(status) {
  if (!status) {
    return 'New';
  }

  return LEGACY_STATUS_MAP[status] || status;
}

export async function migrateLegacyLeadStatuses() {
  if (!migrationPromise) {
    migrationPromise = Promise.all([
      Lead.updateMany({ status: 'Not Interested' }, { $set: { status: 'Non Qualified' } }),
      Lead.updateMany({ status: 'Converted' }, { $set: { status: 'Interested' } }),
    ]).catch((error) => {
      migrationPromise = null;
      throw error;
    });
  }

  return migrationPromise;
}
