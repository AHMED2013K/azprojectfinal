import mongoose from 'mongoose';

const passwordResetTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  tokenHash: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: true },
  usedAt: { type: Date, default: null },
  requestedIp: { type: String, default: '' },
  requestedUserAgent: { type: String, default: '' },
}, { timestamps: true });

passwordResetTokenSchema.index({ createdAt: -1 });

const PasswordResetToken = mongoose.model('PasswordResetToken', passwordResetTokenSchema);

export default PasswordResetToken;
