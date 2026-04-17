import { describe, expect, it } from 'vitest';
import { buildOtpAuthUri, generateTwoFactorSecret, verifyTotpCode } from '../server/src/utils/twoFactor.js';

describe('two-factor utilities', () => {
  it('generates a base32 secret and otpauth uri', () => {
    const secret = generateTwoFactorSecret();
    const uri = buildOtpAuthUri({ email: 'admin@example.com', secret });

    expect(secret).toMatch(/^[A-Z2-7]+$/);
    expect(uri).toContain('otpauth://totp/');
    expect(uri).toContain(secret);
  });

  it('rejects invalid totp codes', () => {
    expect(verifyTotpCode(generateTwoFactorSecret(), '123456')).toBe(false);
  });
});
