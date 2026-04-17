import mongoose from 'mongoose';
import { getEnv } from './env.js';

const CONNECTION_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

let listenersAttached = false;

function logDatabaseEvent(event, extra = {}) {
  console.log(JSON.stringify({
    level: event === 'db.error' ? 'error' : event === 'db.disconnected' ? 'warn' : 'info',
    event,
    at: new Date().toISOString(),
    ...extra,
  }));
}

function attachConnectionListeners() {
  if (listenersAttached) {
    return;
  }

  listenersAttached = true;
  mongoose.connection.on('connected', () => logDatabaseEvent('db.connected'));
  mongoose.connection.on('disconnected', () => logDatabaseEvent('db.disconnected'));
  mongoose.connection.on('reconnected', () => logDatabaseEvent('db.reconnected'));
  mongoose.connection.on('error', (error) => logDatabaseEvent('db.error', { message: error.message }));
}

export async function connectDatabase() {
  const { MONGODB_URI: uri } = getEnv();

  if (!uri) {
    throw new Error('MONGODB_URI is required');
  }

  mongoose.set('strictQuery', true);
  attachConnectionListeners();
  await mongoose.connect(uri, {
    maxPoolSize: 10,
    minPoolSize: 1,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxIdleTimeMS: 30000,
  });
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.disconnect();
}

export function getDatabaseHealth() {
  return {
    state: CONNECTION_STATES[mongoose.connection.readyState] || 'unknown',
    host: mongoose.connection.host || '',
    name: mongoose.connection.name || '',
  };
}
