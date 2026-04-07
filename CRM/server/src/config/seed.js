import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { getEnv } from './env.js';

export async function seedDefaults() {
  const env = getEnv();
  const adminEmail = (env.SEED_ADMIN_EMAIL || 'admin@edugrowth.tn').toLowerCase();
  const agentEmail = (env.SEED_AGENT_EMAIL || 'agent@edugrowth.com').toLowerCase();

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: env.SEED_ADMIN_NAME || 'EduGrowth Admin',
      email: adminEmail,
      passwordHash: await bcrypt.hash(env.SEED_ADMIN_PASSWORD || 'edugrowth.741Ee', 12),
      role: 'admin',
    });
  }

  const existingAgent = await User.findOne({ email: agentEmail });
  if (!existingAgent) {
    await User.create({
      name: 'Commercial Agent',
      email: agentEmail,
      passwordHash: await bcrypt.hash(env.SEED_AGENT_PASSWORD || 'Agent123!', 12),
      role: 'commercial',
    });
  }
}
