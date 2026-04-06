import express from 'express';
import Lead from '../models/Lead.js';
import Announcement from '../models/Announcement.js';
import User from '../models/User.js';
import WorkSession from '../models/WorkSession.js';
import Notification from '../models/Notification.js';
import AuditLog from '../models/AuditLog.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { serializeLead, sanitizeUser } from '../utils/serializers.js';
import { buildLeadAccessQuery, isAdmin } from '../utils/access.js';

const router = express.Router();

async function aggregateByFieldWithMatch(path, match) {
  const results = await Lead.aggregate([
    { $match: { ...match, [path]: { $exists: true, $nin: ['', null] } } },
    { $group: { _id: `$${path}`, value: { $sum: 1 } } },
    { $sort: { value: -1, _id: 1 } },
    { $limit: 8 },
  ]);

  return results.map((item) => ({
    label: item._id,
    value: item.value,
  }));
}

router.get('/', asyncHandler(async (req, res) => {
  const leadScope = buildLeadAccessQuery(req.user);
  const auditQuery = isAdmin(req.user) ? {} : { actor: req.user._id };
  const workLogQuery = isAdmin(req.user) ? {} : { user: req.user._id };
  const recentLeadsQuery = leadScope;

  const [
    totalLeads,
    activeLeads,
    convertedLeads,
    users,
    recentLeads,
    announcements,
    workLog,
    unreadNotifications,
    auditFeed,
    newLeads,
    contactedLeads,
    notInterestedLeads,
    studyFieldBreakdown,
    studyLevelBreakdown,
    financialBreakdown,
    awarenessBreakdown,
  ] = await Promise.all([
    Lead.countDocuments(leadScope),
    Lead.countDocuments({ ...leadScope, status: { $in: ['New', 'Contacted'] } }),
    Lead.countDocuments({ ...leadScope, status: 'Converted' }),
    isAdmin(req.user) ? User.find().sort({ name: 1 }) : User.find({ _id: req.user._id }).sort({ name: 1 }),
    Lead.find(recentLeadsQuery).sort({ createdAt: -1 }).limit(6).populate('createdBy').populate('assignedTo').populate('notes.author'),
    Announcement.find().sort({ createdAt: -1 }).limit(5).populate('author'),
    WorkSession.find(workLogQuery).sort({ updatedAt: -1 }).limit(10).populate('user'),
    Notification.countDocuments({ user: req.user._id, readAt: null }),
    AuditLog.find(auditQuery).sort({ createdAt: -1 }).limit(10).populate('actor'),
    Lead.countDocuments({ ...leadScope, status: 'New' }),
    Lead.countDocuments({ ...leadScope, status: 'Contacted' }),
    Lead.countDocuments({ ...leadScope, status: 'Not Interested' }),
    aggregateByFieldWithMatch('details.studyField', leadScope),
    aggregateByFieldWithMatch('details.studyLevel', leadScope),
    aggregateByFieldWithMatch('details.financialSituation', leadScope),
    aggregateByFieldWithMatch('details.alternanceAwareness', leadScope),
  ]);

  res.json({
    stats: {
      totalLeads,
      activeLeads,
      convertedLeads,
      agentsActivity: users.filter((user) => user.isOnline).length,
      unreadNotifications,
    },
    statusBreakdown: [
      { label: 'New', value: newLeads },
      { label: 'Contacted', value: contactedLeads },
      { label: 'Not Interested', value: notInterestedLeads },
      { label: 'Converted', value: convertedLeads },
    ],
    formBreakdowns: {
      studyField: studyFieldBreakdown,
      studyLevel: studyLevelBreakdown,
      financialSituation: financialBreakdown,
      alternanceAwareness: awarenessBreakdown,
    },
    users: users.map(sanitizeUser),
    recentLeads: recentLeads.map(serializeLead),
    announcements: announcements.map((announcement) => ({
      id: announcement._id.toString(),
      title: announcement.title,
      body: announcement.body,
      createdAt: announcement.createdAt,
      author: sanitizeUser(announcement.author),
    })),
    workLog: workLog.map((session) => ({
      id: session._id.toString(),
      dateKey: session.dateKey,
      totalWorkedMinutes: session.totalWorkedMinutes,
      active: session.active,
      paused: session.paused,
      user: sanitizeUser(session.user),
    })),
    auditFeed: auditFeed.map((item) => ({
      id: item._id.toString(),
      action: item.action,
      targetType: item.targetType,
      createdAt: item.createdAt,
      actor: item.actor ? sanitizeUser(item.actor) : null,
    })),
  });
}));

export default router;
