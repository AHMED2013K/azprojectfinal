import { describe, expect, it } from 'vitest';
import { createConversationId } from '../server/src/utils/conversation.js';
import { signAccessToken, signRefreshToken, verifyToken } from '../server/src/utils/auth.js';

describe('auth utilities', () => {
  it('creates stable conversation ids regardless of order', () => {
    expect(createConversationId('b-user', 'a-user')).toBe('a-user:b-user');
    expect(createConversationId('a-user', 'b-user')).toBe('a-user:b-user');
  });

  it('signs and verifies access tokens', () => {
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/test';
    process.env.JWT_SECRET = 'test-secret-123456789012345678901234';
    const token = signAccessToken({ _id: { toString: () => 'user-1' }, role: 'admin' });
    const payload = verifyToken(token);
    expect(payload.sub).toBe('user-1');
    expect(payload.role).toBe('admin');
  });

  it('signs tokens with session ids when provided', () => {
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/test';
    process.env.JWT_SECRET = 'test-secret-123456789012345678901234';
    const accessToken = signAccessToken({ _id: { toString: () => 'user-1' }, role: 'admin', sessionId: 'session-1' });
    const refreshToken = signRefreshToken({ _id: { toString: () => 'user-1' }, sessionId: 'session-1' });

    expect(verifyToken(accessToken).sid).toBe('session-1');
    expect(verifyToken(refreshToken).sid).toBe('session-1');
  });
});
