import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional().default('development'),
  PORT: z.coerce.number().int().positive().optional().default(4000),
  CLIENT_URL: z.string().trim().min(1).optional().default('http://localhost:5173'),
  MONGODB_URI: z.string().trim().optional().default(''),
  MONGO_URI: z.string().trim().optional().default(''),
  JWT_SECRET: z.string().trim().min(32, 'JWT_SECRET must be at least 32 characters long').optional(),
  JWT_EXPIRES_IN: z.string().trim().min(2).optional().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().trim().min(2).optional().default('7d'),
  ALLOWED_ORIGINS: z.string().trim().optional().default(''),
  PUBLIC_FORM_ALLOWED_ORIGINS: z.string().trim().optional().default(''),
  CRM_ALLOWED_IPS: z.string().trim().optional().default(''),
  COOKIE_SAME_SITE: z.enum(['strict', 'lax', 'none']).optional().default('strict'),
  TRUST_PROXY: z.enum(['true', 'false']).optional().default('false'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).optional().default('info'),
  REQUEST_TIMEOUT_MS: z.coerce.number().int().positive().optional().default(15000),
  HEALTH_LOG_INTERVAL_MS: z.coerce.number().int().positive().optional().default(60000),
  METADATA_CACHE_TTL_MS: z.coerce.number().int().positive().optional().default(30000),
  LOGIN_MAX_FAILURES: z.coerce.number().int().positive().optional().default(5),
  LOGIN_LOCKOUT_MINUTES: z.coerce.number().int().positive().optional().default(15),
  SEED_ADMIN_NAME: z.string().trim().optional().default('EduGrowth Admin'),
  SEED_ADMIN_EMAIL: z.string().trim().email().optional(),
  SEED_ADMIN_PASSWORD: z.string().trim().optional(),
  SEED_AGENT_EMAIL: z.string().trim().email().optional(),
  SEED_AGENT_PASSWORD: z.string().trim().optional(),
});

let cachedEnv = null;

function parseCsv(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getEnv() {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = envSchema.parse(process.env);
  const generatedDevSecret = 'development-only-secret-change-me-1234567890';
  const jwtSecret = parsed.JWT_SECRET || generatedDevSecret;
  const mongoUri = parsed.MONGODB_URI || parsed.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI or MONGO_URI is required');
  }

  if (parsed.NODE_ENV === 'production') {
    if (!parsed.JWT_SECRET || parsed.JWT_SECRET === generatedDevSecret) {
      throw new Error('A strong JWT_SECRET is required in production');
    }
    if (!parsed.SEED_ADMIN_PASSWORD || !parsed.SEED_AGENT_PASSWORD) {
      throw new Error('Seed passwords must be explicitly defined in production');
    }
  }

  cachedEnv = {
    ...parsed,
    MONGODB_URI: mongoUri,
    JWT_SECRET: jwtSecret,
    COOKIE_SAME_SITE_EFFECTIVE: parsed.NODE_ENV === 'production' && parsed.COOKIE_SAME_SITE === 'strict'
      ? 'none'
      : parsed.COOKIE_SAME_SITE,
    ALLOWED_ORIGINS_LIST: Array.from(new Set([
      parsed.CLIENT_URL,
      ...parseCsv(parsed.ALLOWED_ORIGINS),
      'http://localhost:5173',
      'http://localhost:4173',
      'http://localhost:4174',
    ])),
    PUBLIC_FORM_ALLOWED_ORIGINS_LIST: Array.from(new Set([
      parsed.CLIENT_URL,
      ...parseCsv(parsed.PUBLIC_FORM_ALLOWED_ORIGINS),
      'http://localhost:5173',
      'http://localhost:4173',
      'http://localhost:4174',
    ])),
    CRM_ALLOWED_IPS_LIST: parseCsv(parsed.CRM_ALLOWED_IPS),
    TRUST_PROXY_ENABLED: parsed.TRUST_PROXY === 'true',
  };

  return cachedEnv;
}
