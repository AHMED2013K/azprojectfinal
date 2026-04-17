import fs from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';
import { promisify } from 'node:util';
import Lead from '../models/Lead.js';
import DeletedLead from '../models/DeletedLead.js';
import LeadSubmissionBackup from '../models/LeadSubmissionBackup.js';
import { getEnv } from '../config/env.js';
import { logAppEvent } from '../utils/logger.js';

const gzip = promisify(zlib.gzip);

const backupState = {
  running: false,
  lastRunAt: null,
  lastSuccessAt: null,
  lastUploadedAt: null,
  lastFilePath: '',
  lastRemoteStatus: '',
  lastError: '',
};

let backupTimer = null;

export function getBackupStatus() {
  return { ...backupState };
}

async function pruneOldSnapshots(outputDir, retentionCount) {
  const entries = await fs.readdir(outputDir).catch(() => []);
  const snapshotFiles = entries
    .filter((entry) => entry.endsWith('.json.gz'))
    .sort()
    .reverse();

  const removable = snapshotFiles.slice(retentionCount);
  await Promise.all(removable.map((entry) => fs.unlink(path.join(outputDir, entry)).catch(() => {})));
}

async function uploadSnapshot(buffer, filename) {
  const env = getEnv();
  if (!env.BACKUP_UPLOAD_URL) {
    return { skipped: true, status: 'disabled' };
  }

  const response = await fetch(env.BACKUP_UPLOAD_URL, {
    method: env.BACKUP_UPLOAD_METHOD,
    headers: {
      'content-type': 'application/gzip',
      'x-backup-filename': filename,
      ...(env.BACKUP_UPLOAD_AUTH_TOKEN ? { authorization: `Bearer ${env.BACKUP_UPLOAD_AUTH_TOKEN}` } : {}),
    },
    body: buffer,
  });

  if (!response.ok) {
    throw new Error(`Remote backup upload failed with status ${response.status}`);
  }

  return {
    skipped: false,
    status: `${response.status}`,
  };
}

export async function runScheduledBackup() {
  if (backupState.running) {
    return getBackupStatus();
  }

  const env = getEnv();
  const outputDir = env.BACKUP_OUTPUT_DIR || path.join(process.cwd(), 'server', 'backups', 'snapshots');
  const filename = `crm-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json.gz`;
  const filePath = path.join(outputDir, filename);

  backupState.running = true;
  backupState.lastRunAt = new Date().toISOString();
  backupState.lastError = '';

  try {
    const [leads, deletedLeads, leadSubmissionBackups] = await Promise.all([
      Lead.find().lean(),
      DeletedLead.find().lean(),
      LeadSubmissionBackup.find().lean(),
    ]);

    const payload = {
      generatedAt: new Date().toISOString(),
      service: 'edugrowth-crm',
      counts: {
        leads: leads.length,
        deletedLeads: deletedLeads.length,
        leadSubmissionBackups: leadSubmissionBackups.length,
      },
      leads,
      deletedLeads,
      leadSubmissionBackups,
    };

    const compressed = await gzip(JSON.stringify(payload));
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(filePath, compressed);
    await pruneOldSnapshots(outputDir, env.BACKUP_RETENTION_COUNT);

    const uploadResult = await uploadSnapshot(compressed, filename);
    backupState.lastSuccessAt = new Date().toISOString();
    backupState.lastUploadedAt = uploadResult.skipped ? backupState.lastUploadedAt : new Date().toISOString();
    backupState.lastFilePath = filePath;
    backupState.lastRemoteStatus = uploadResult.status;

    logAppEvent('backup.completed', {
      filename,
      filePath,
      remoteStatus: uploadResult.status,
      leadCount: leads.length,
      deletedLeadCount: deletedLeads.length,
      leadSubmissionBackupCount: leadSubmissionBackups.length,
    });
  } catch (error) {
    backupState.lastError = error.message;
    logAppEvent('backup.failed', { message: error.message }, 'error');
    throw error;
  } finally {
    backupState.running = false;
  }

  return getBackupStatus();
}

export function startBackupScheduler() {
  const env = getEnv();
  if (backupTimer) {
    clearInterval(backupTimer);
  }

  backupTimer = setInterval(() => {
    runScheduledBackup().catch(() => {});
  }, env.BACKUP_INTERVAL_MS);
  backupTimer.unref();
}

export function stopBackupScheduler() {
  if (backupTimer) {
    clearInterval(backupTimer);
    backupTimer = null;
  }
}
