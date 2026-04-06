import mongoose from 'mongoose';
import { getEnv } from './env.js';

export async function connectDatabase() {
  const { MONGODB_URI: uri } = getEnv();

  if (!uri) {
    throw new Error('MONGODB_URI is required');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
}
