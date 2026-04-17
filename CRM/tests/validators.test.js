import { describe, expect, it } from 'vitest';
import { createUserSchema } from '../server/src/validators/auth.validators.js';
import { createLeadSchema, publicLeadSchema } from '../server/src/validators/lead.validators.js';

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
});
