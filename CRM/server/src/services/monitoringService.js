import { getEnv } from '../config/env.js';
import { getDatabaseHealth } from '../config/database.js';
import { getBackupStatus } from './backupService.js';
import { logAppEvent } from '../utils/logger.js';

const monitoringState = {
  lastHeartbeatAt: null,
  lastAlertAt: null,
  lastAlertMessage: '',
  lastHealthStatus: 'unknown',
};

let heartbeatTimer = null;
let healthTimer = null;

export function getMonitoringStatus() {
  return { ...monitoringState };
}

async function sendWebhook(url, payload) {
  if (!url) {
    return;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed with status ${response.status}`);
  }
}

export async function sendAlert(event, details = {}) {
  const env = getEnv();
  const now = Date.now();
  if (
    monitoringState.lastAlertAt
    && (now - new Date(monitoringState.lastAlertAt).getTime()) < env.MONITORING_ALERT_COOLDOWN_MS
    && monitoringState.lastAlertMessage === event
  ) {
    return;
  }

  monitoringState.lastAlertAt = new Date(now).toISOString();
  monitoringState.lastAlertMessage = event;

  const payload = {
    event,
    service: 'edugrowth-crm',
    at: monitoringState.lastAlertAt,
    ...details,
  };

  try {
    await sendWebhook(env.ALERT_WEBHOOK_URL, payload);
    logAppEvent('monitoring.alert_sent', payload, 'warn');
  } catch (error) {
    logAppEvent('monitoring.alert_failed', { event, message: error.message }, 'error');
  }
}

async function sendHeartbeat() {
  const env = getEnv();
  if (!env.MONITORING_HEARTBEAT_URL) {
    return;
  }

  const payload = {
    service: 'edugrowth-crm',
    at: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
    memoryRssMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
    database: getDatabaseHealth(),
    backup: getBackupStatus(),
  };

  await sendWebhook(env.MONITORING_HEARTBEAT_URL, payload);
  monitoringState.lastHeartbeatAt = payload.at;
  monitoringState.lastHealthStatus = payload.database.ok ? 'healthy' : 'degraded';
}

async function evaluateHealth() {
  const database = getDatabaseHealth();
  const memoryRssMb = Math.round(process.memoryUsage().rss / 1024 / 1024);
  const backup = getBackupStatus();

  if (!database.ok) {
    await sendAlert('database.unhealthy', { database });
  }

  if (memoryRssMb >= getEnv().MONITORING_MEMORY_ALERT_MB) {
    await sendAlert('memory.high', { memoryRssMb });
  }

  if (backup.lastError) {
    await sendAlert('backup.failed', { backup });
  }
}

export function startMonitoringService() {
  const env = getEnv();
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
  }
  if (healthTimer) {
    clearInterval(healthTimer);
  }

  heartbeatTimer = setInterval(() => {
    sendHeartbeat().catch((error) => {
      logAppEvent('monitoring.heartbeat_failed', { message: error.message }, 'error');
    });
  }, env.MONITORING_HEARTBEAT_INTERVAL_MS);
  heartbeatTimer.unref();

  healthTimer = setInterval(() => {
    evaluateHealth().catch(() => {});
  }, env.HEALTH_LOG_INTERVAL_MS);
  healthTimer.unref();
}

export function stopMonitoringService() {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
  if (healthTimer) {
    clearInterval(healthTimer);
    healthTimer = null;
  }
}
