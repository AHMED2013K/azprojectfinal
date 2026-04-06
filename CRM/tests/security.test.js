import { describe, expect, it } from 'vitest';
import { buildLeadAccessQuery, assertLeadAccess } from '../server/src/utils/access.js';

describe('lead access control', () => {
  it('limits commercial users to owned or assigned leads', () => {
    const user = { _id: '507f191e810c19729de860ea', role: 'commercial' };
    expect(buildLeadAccessQuery(user)).toEqual({
      $or: [
        { createdBy: user._id },
        { assignedTo: user._id },
      ],
    });
  });

  it('lets admins access every lead', () => {
    const user = { _id: '507f191e810c19729de860ea', role: 'admin' };
    expect(buildLeadAccessQuery(user)).toEqual({});
  });

  it('denies a commercial user when the lead is neither assigned nor created by them', () => {
    const user = { _id: { toString: () => '507f191e810c19729de860ea' }, role: 'commercial' };
    const lead = {
      createdBy: { toString: () => '507f191e810c19729de860eb' },
      assignedTo: { toString: () => '507f191e810c19729de860ec' },
    };

    expect(assertLeadAccess(user, lead)).toBe(false);
  });
});
