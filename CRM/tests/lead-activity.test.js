import { describe, expect, it } from 'vitest';
import { addLeadActivity, getChangedFields } from '../server/src/utils/leadActivity.js';

describe('lead activity utilities', () => {
  it('tracks lead activity and updates lastActivityAt', () => {
    const lead = {
      activityLog: [],
      lastActivityAt: null,
    };

    addLeadActivity(lead, {
      type: 'lead_created',
      label: 'Lead created manually',
      actor: 'user-1',
      meta: { status: 'New' },
    });

    expect(lead.activityLog).toHaveLength(1);
    expect(lead.activityLog[0].type).toBe('lead_created');
    expect(lead.lastActivityAt).toBeInstanceOf(Date);
  });

  it('returns only fields that changed', () => {
    const changed = getChangedFields(
      { name: 'Alice', status: 'New', country: 'Tunisia' },
      { name: 'Alice', status: 'Interested', country: 'France' },
    );

    expect(changed).toEqual(['status', 'country']);
  });
});
