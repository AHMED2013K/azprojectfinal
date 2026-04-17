import express from 'express';
import os from 'node:os';
import AuditLog from '../models/AuditLog.js';
import Lead from '../models/Lead.js';
import LeadSubmissionBackup from '../models/LeadSubmissionBackup.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { requireRole } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getDatabaseHealth } from '../config/database.js';
import { sanitizeUser } from '../utils/serializers.js';
import { getBackupStatus } from '../services/backupService.js';
import { getMonitoringStatus } from '../services/monitoringService.js';

const router = express.Router();

router.use(requireRole('admin'));

router.post('/users/:id/unlock', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.failedLoginCount = 0;
  user.lastFailedLoginAt = null;
  user.lockUntil = null;
  await user.save();

  await AuditLog.create({
    actor: req.user._id,
    action: 'auth.user_unlocked',
    targetType: 'user',
    targetId: user._id.toString(),
    details: { email: user.email },
  });

  res.json({ user: sanitizeUser(user), message: 'User account unlocked' });
}));

router.get('/diagnostics', asyncHandler(async (req, res) => {
  const [
    totalLeads,
    totalUsers,
    onlineUsers,
    lockedUsers,
    recentAuthFailures,
    recentAuditLogs,
    backupCount,
    latestBackup,
    unreadNotifications,
  ] = await Promise.all([
    Lead.countDocuments(),
    User.countDocuments(),
    User.countDocuments({ isOnline: true }),
    User.find({ lockUntil: { $gt: new Date() } }).sort({ lockUntil: -1 }).limit(10),
    AuditLog.find({ action: 'auth.failure' }).sort({ createdAt: -1 }).limit(20).populate('actor'),
    AuditLog.find().sort({ createdAt: -1 }).limit(20).populate('actor'),
    LeadSubmissionBackup.countDocuments(),
    LeadSubmissionBackup.findOne().sort({ backedUpAt: -1, createdAt: -1 }),
    Notification.countDocuments({ readAt: null }),
  ]);

  res.json({
    system: {
      uptimeSeconds: Math.round(process.uptime()),
      memoryRssMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
      memoryHeapUsedMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      cpuLoad: os.loadavg()[0],
      database: getDatabaseHealth(),
    },
    stats: {
      totalLeads,
      totalUsers,
      onlineUsers,
      unreadNotifications,
      backupCount,
    },
    backups: {
      latestBackupAt: latestBackup?.backedUpAt || null,
      latestBackupLead: latestBackup ? {
        name: latestBackup.name,
        email: latestBackup.email,
        source: latestBackup.source,
      } : null,
      scheduler: getBackupStatus(),
    },
    monitoring: getMonitoringStatus(),
    lockedUsers: lockedUsers.map(sanitizeUser),
    authFailures: recentAuthFailures.map((item) => ({
      id: item._id.toString(),
      createdAt: item.createdAt,
      actor: item.actor ? sanitizeUser(item.actor) : null,
      details: item.details || {},
    })),
    auditLogs: recentAuditLogs.map((item) => ({
      id: item._id.toString(),
      action: item.action,
      targetType: item.targetType,
      targetId: item.targetId,
      createdAt: item.createdAt,
      actor: item.actor ? sanitizeUser(item.actor) : null,
      details: item.details || {},
    })),
  });
}));

export default router;
