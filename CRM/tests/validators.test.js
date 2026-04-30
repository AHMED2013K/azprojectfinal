import { describe, expect, it } from 'vitest';
import { createUserSchema, updateUserSchema } from '../server/src/validators/auth.validators.js';
import { bulkLeadsSchema, createLeadSchema, publicLeadSchema, savedLeadFilterSchema } from '../server/src/validators/lead.validators.js';

describe('validation schemas', () => {
  it('accepts a strong user payload', async () => {
    const parsed = await createUserSchema.parseAsync({
      body: {
        name: 'Alice Admin',
        email: 'ALICE@example.com',
        password: 'StrongPass1',
        role: 'admin',
      },
    });

    expect(parsed.body.email).toBe('alice@example.com');
  });

  it('accepts manager and viewer roles for team setup', async () => {
    const parsed = await createUserSchema.parseAsync({
      body: {
        name: 'Mona Manager',
        email: 'manager@example.com',
        password: 'StrongPass1',
        role: 'manager',
      },
    });

    expect(parsed.body.role).toBe('manager');
  });

  it('rejects weak passwords', async () => {
    await expect(createUserSchema.parseAsync({
      body: {
        name: 'Bob User',
        email: 'bob@example.com',
        password: 'weak',
        role: 'commercial',
      },
    })).rejects.toBeTruthy();
  });

  it('accepts admin user updates and ignores an empty password field', async () => {
    const parsed = await updateUserSchema.parseAsync({
      body: {
        name: 'Updated Member',
        email: 'MEMBER@example.com',
        password: '',
        role: 'commercial',
      },
    });

    expect(parsed.body.email).toBe('member@example.com');
    expect(parsed.body.password).toBeUndefined();
  });

  it('normalizes lead emails', async () => {
    const parsed = await createLeadSchema.parseAsync({
      body: {
        name: 'Lead Tester',
        email: 'LEAD@EXAMPLE.COM',
        country: 'Morocco',
      },
    });

    expect(parsed.body.email).toBe('lead@example.com');
    expect(parsed.body.status).toBe('New');
  });

  it('accepts ISO birth dates from browser date inputs for public forms', async () => {
    const parsed = await publicLeadSchema.parseAsync({
      body: {
        name: 'Lead Tester',
        email: 'lead@example.com',
        phone: '21612345678',
        country: 'Tunisia',
        dateOfBirth: '2002-09-14',
        studyField: 'Marketing',
        studyLevel: 'Licence',
        alternanceAwareness: 'Oui, je suis informe(e)',
        financialSituation: 'Compte bloque',
        message: '',
      },
    });

    expect(parsed.body.dateOfBirth).toBe('14/09/2002');
  });

  it('accepts quick filters in saved lead filters', async () => {
    const parsed = await savedLeadFilterSchema.parseAsync({
      body: {
        name: 'Stale leads',
        search: '',
        status: '',
        bucket: 'leads',
        quickFilter: 'stale',
      },
    });

    expect(parsed.body.quickFilter).toBe('stale');
  });

  it('accepts bulk assignment payloads', async () => {
    const parsed = await bulkLeadsSchema.parseAsync({
      body: {
        action: 'assign',
        leadIds: ['507f191e810c19729de860ea'],
        assignedTo: '507f191e810c19729de860eb',
      },
    });

    expect(parsed.body.action).toBe('assign');
    expect(parsed.body.assignedTo).toBe('507f191e810c19729de860eb');
  });
});
