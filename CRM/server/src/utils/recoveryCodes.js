import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';

function buildCode() {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
}

export async function generateRecoveryCodes(count = 8) {
  const codes = Array.from({ length: count }, buildCode);
  const hashes = await Promise.all(codes.map((code) => bcrypt.hash(code, 12)));
  return { codes, hashes };
}

export async function consumeRecoveryCode(hashes = [], candidate = '') {
  const normalized = String(candidate || '').trim().toUpperCase();
  for (let index = 0; index < hashes.length; index += 1) {
    const matches = await bcrypt.compare(normalized, hashes[index]);
    if (matches) {
      return {
        matched: true,
        remainingHashes: hashes.filter((_, hashIndex) => hashIndex !== index),
      };
    }
  }

  return { matched: false, remainingHashes: hashes };
}
