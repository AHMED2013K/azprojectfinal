import http from 'node:http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDatabase } from './src/config/database.js';
import { disconnectDatabase, getDatabaseHealth } from './src/config/database.js';
import { seedDefaults } from './src/config/seed.js';
import { authMiddleware, csrfProtection, socketAuthMiddleware } from './src/middleware/auth.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import { attachSocketHandlers } from './src/socket/index.js';
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/users.routes.js';
import leadRoutes from './src/routes/leads.routes.js';
import dashboardRoutes from './src/routes/dashboard.routes.js';
import trackingRoutes from './src/routes/tracking.routes.js';
import announcementRoutes from './src/routes/announcements.routes.js';
import inviteRoutes from './src/routes/invites.routes.js';
import chatRoutes from './src/routes/chat.routes.js';
import notificationRoutes from './src/routes/notifications.routes.js';
import backupRoutes from './src/routes/backups.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import { getEnv } from './src/config/env.js';
import { createIpAllowlistMiddleware, createOriginChecker } from './src/utils/security.js';
import { logAppEvent, requestLogger } from './src/utils/logger.js';
import { migrateLegacyLeadStatuses } from './src/utils/leadStatus.js';
import { runScheduledBackup, startBackupScheduler, stopBackupScheduler } from './src/services/backupService.js';
import { sendAlert, startMonitoringService, stopMonitoringService } from './src/services/monitoringService.js';

dotenv.config();
const env = getEnv();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.ALLOWED_ORIGINS_LIST,
    credentials: true,
  },
});

app.set('io', io);
app.set('trust proxy', env.TRUST_PROXY_ENABLED);
app.disable('x-powered-by');
app.use(requestLogger);
app.use(helmet({
  frameguard: { action: 'deny' },
  referrerPolicy: { policy: 'no-referrer' },
  hsts: env.NODE_ENV === 'production' ? {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  } : false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'data:'],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", ...env.ALLOWED_ORIGINS_LIST, 'ws:', 'wss:'],
      mediaSrc: ["'self'"],
    },
  },
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: createOriginChecker(env.ALLOWED_ORIGINS_LIST),
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  req.setTimeout(env.REQUEST_TIMEOUT_MS);
  res.setTimeout(env.REQUEST_TIMEOUT_MS, () => {
    if (!res.headersSent) {
      res.status(503).json({ message: 'Request timeout' });
    }
  });
  next();
});
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
}));
app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
}));
app.use('/api/invites/public', cors({
  origin: createOriginChecker(env.PUBLIC_FORM_ALLOWED_ORIGINS_LIST),
  credentials: true,
}));
app.use('/api/invites/public', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'EduGrowth CRM API',
    uptimeSeconds: Math.round(process.uptime()),
    memory: {
      rssMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
      heapUsedMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    },
    database: getDatabaseHealth(),
  });
});
app.get('/', (req, res) => {
  res.send('EduGrowth CRM API is running 🚀');
});

app.use('/api/auth', authRoutes);
app.use('/api/invites', inviteRoutes);
app.use('/api/users', authMiddleware, createIpAllowlistMiddleware(env.CRM_ALLOWED_IPS_LIST), csrfProtection, userRoutes);
app.use('/api/leads', authMiddleware, createIpAllowlistMiddleware(env.CRM_ALLOWED_IPS_LIST), csrfProtection, leadRoutes);
app.use('/api/dashboard', authMiddleware, createIpAllowlistMiddleware(env.CRM_ALLOWED_IPS_LIST), csrfProtection, dashboardRoutes);
app.use('/api/tracking', authMiddleware, createIpAllowlistMiddleware(env.CRM_ALLOWED_IPS_LIST), csrfProtection, trackingRoutes);
app.use('/api/announcements', authMiddleware, createIpAllowlistMiddleware(env.CRM_ALLOWED_IPS_LIST), csrfProtection, announcementRoutes);
app.use('/api/chat', authMiddleware, createIpAllowlistMiddleware(env.CRM_ALLOWED_IPS_LIST), csrfProtection, chatRoutes);
app.use('/api/notifications', authMiddleware, createIpAllowlistMiddleware(env.CRM_ALLOWED_IPS_LIST), csrfProtection, notificationRoutes);
app.use('/api/backups', authMiddleware, createIpAllowlistMiddleware(env.CRM_ALLOWED_IPS_LIST), csrfProtection, backupRoutes);
app.use('/api/admin', authMiddleware, createIpAllowlistMiddleware(env.CRM_ALLOWED_IPS_LIST), csrfProtection, adminRoutes);

app.use(errorHandler);

io.use(socketAuthMiddleware);
attachSocketHandlers(io);


const PORT = process.env.PORT || 4000;
let healthLogTimer = null;

async function bootstrap() {
  await connectDatabase();
  await migrateLegacyLeadStatuses();
  await seedDefaults();

  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
  server.requestTimeout = env.REQUEST_TIMEOUT_MS;

  healthLogTimer = setInterval(() => {
    logAppEvent('process.health', {
      uptimeSeconds: Math.round(process.uptime()),
      memoryRssMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
      memoryHeapUsedMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      database: getDatabaseHealth(),
    });
  }, env.HEALTH_LOG_INTERVAL_MS);
  healthLogTimer.unref();

  startBackupScheduler();
  startMonitoringService();
  runScheduledBackup().catch((error) => {
    logAppEvent('backup.initial_run_failed', { message: error.message }, 'error');
  });

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`EduGrowth CRM API listening on port ${PORT}`);
  });
}

async function shutdown(signal) {
  logAppEvent('process.shutdown', { signal });
  if (healthLogTimer) {
    clearInterval(healthLogTimer);
  }
  stopBackupScheduler();
  stopMonitoringService();
  server.close(async () => {
    await disconnectDatabase().catch((error) => {
      logAppEvent('process.shutdown_error', { message: error.message }, 'error');
    });
    process.exit(0);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start server', error);
  sendAlert('process.bootstrap_failed', { message: error.message }).catch(() => {});
  process.exit(1);
});

process.on('SIGTERM', () => { shutdown('SIGTERM').catch(() => process.exit(1)); });
process.on('SIGINT', () => { shutdown('SIGINT').catch(() => process.exit(1)); });
process.on('unhandledRejection', (error) => {
  const message = error instanceof Error ? error.message : String(error);
  logAppEvent('process.unhandled_rejection', { message }, 'error');
  sendAlert('process.unhandled_rejection', { message }).catch(() => {});
});
process.on('uncaughtException', (error) => {
  logAppEvent('process.uncaught_exception', { message: error.message }, 'error');
  sendAlert('process.uncaught_exception', { message: error.message }).finally(() => {
    process.exit(1);
  });
});
