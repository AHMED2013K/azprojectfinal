import mongoose from 'mongoose';

const userSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  refreshTokenHash: { type: String, required: true },
  ipAddress: { type: String, default: '' },
  userAgent: { type: String, default: '' },
  deviceLabel: { type: String, default: '' },
  lastSeenAt: { type: Date, default: Date.now, index: true },
  revokedAt: { type: Date, default: null, index: true },
}, { timestamps: true });

userSessionSchema.index({ user: 1, createdAt: -1 });

const UserSession = mongoose.model('UserSession', userSessionSchema);

export default UserSession;
