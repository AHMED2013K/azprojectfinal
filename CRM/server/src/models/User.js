import mongoose from 'mongoose';
import { USER_ROLES } from '../constants/index.js';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  refreshTokenHash: { type: String, default: null },
  role: { type: String, enum: USER_ROLES, default: 'commercial' },
  avatar: { type: String, default: '' },
  isOnline: { type: Boolean, default: false },
  lastSeenAt: { type: Date },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
