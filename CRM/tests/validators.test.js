import { describe, expect, it } from 'vitest';
import { createUserSchema } from '../server/src/validators/auth.validators.js';
import { createLeadSchema } from '../server/src/validators/lead.validators.js';

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
});
