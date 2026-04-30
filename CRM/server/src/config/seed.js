import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { getEnv } from './env.js';

export async function seedDefaults() {
  const env = getEnv();
  const adminEmail = (env.SEED_ADMIN_EMAIL || 'admin@edugrowth.tn').toLowerCase();
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: env.SEED_ADMIN_NAME || 'EduGrowth Admin',
      email: adminEmail,
      passwordHash: await bcrypt.hash(env.SEED_ADMIN_PASSWORD || 'edugrowth.741Ee', 12),
      role: 'admin',
    });
  }
}
