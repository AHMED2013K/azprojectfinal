import crypto from 'node:crypto';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function toBase32(buffer) {
  let bits = '';
  for (const byte of buffer) {
    bits += byte.toString(2).padStart(8, '0');
  }

  let output = '';
  for (let index = 0; index < bits.length; index += 5) {
    const chunk = bits.slice(index, index + 5).padEnd(5, '0');
    output += BASE32_ALPHABET[Number.parseInt(chunk, 2)];
  }

  return output;
}

function fromBase32(value = '') {
  const normalized = String(value || '').replace(/=+$/g, '').toUpperCase().replace(/[^A-Z2-7]/g, '');
  let bits = '';
  for (const char of normalized) {
    const index = BASE32_ALPHABET.indexOf(char);
    if (index >= 0) {
      bits += index.toString(2).padStart(5, '0');
    }
  }

  const bytes = [];
  for (let index = 0; index + 8 <= bits.length; index += 8) {
    bytes.push(Number.parseInt(bits.slice(index, index + 8), 2));
  }

  return Buffer.from(bytes);
}

export function generateTwoFactorSecret() {
  return toBase32(crypto.randomBytes(20));
}

export function buildOtpAuthUri({ email, secret, issuer = 'EduGrowth CRM' }) {
  const label = encodeURIComponent(`${issuer}:${email}`);
  return `otpauth://totp/${label}?secret=${secret}&issuer=${encodeURIComponent(issuer)}`;
}

export function verifyTotpCode(secret, code, window = 1) {
  const normalizedCode = String(code || '').trim();
  if (!/^\d{6}$/.test(normalizedCode) || !secret) {
    return false;
  }

  const secretBuffer = fromBase32(secret);
  const currentCounter = Math.floor(Date.now() / 30000);

  for (let offset = -window; offset <= window; offset += 1) {
    const counter = currentCounter + offset;
    const counterBuffer = Buffer.alloc(8);
    counterBuffer.writeBigUInt64BE(BigInt(counter));
    const digest = crypto.createHmac('sha1', secretBuffer).update(counterBuffer).digest();
    const dynamicOffset = digest[digest.length - 1] & 0x0f;
    const binaryCode = (
      ((digest[dynamicOffset] & 0x7f) << 24)
      | ((digest[dynamicOffset + 1] & 0xff) << 16)
      | ((digest[dynamicOffset + 2] & 0xff) << 8)
      | (digest[dynamicOffset + 3] & 0xff)
    );
    const totp = String(binaryCode % 1000000).padStart(6, '0');
    if (totp === normalizedCode) {
      return true;
    }
  }

  return false;
}
