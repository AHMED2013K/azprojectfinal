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
import { getLeadMetadataMapCached } from '../utils/leadMetadataCache.js';

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

async function aggregateMonthlyBreakdown(match) {
  const results = await Lead.aggregate([
    { $match: match },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        total: { $sum: 1 },
        newCount: { $sum: { $cond: [{ $eq: ['$status', 'New'] }, 1, 0] } },
        contacted: { $sum: { $cond: [{ $eq: ['$status', 'Contacted'] }, 1, 0] } },
        nonQualified: { $sum: { $cond: [{ $eq: ['$status', 'Non Qualified'] }, 1, 0] } },
        notInterested: { $sum: { $cond: [{ $eq: ['$status', 'Not Interested'] }, 1, 0] } },
        interested: { $sum: { $cond: [{ $eq: ['$status', 'Interested'] }, 1, 0] } },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 12 },
  ]);

  return results.map((item) => {
    const date = new Date(Date.UTC(item._id.year, item._id.month - 1, 1));
    return {
      label: date.toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }),
      total: item.total,
      newCount: item.newCount,
      contacted: item.contacted,
      nonQualified: item.nonQualified,
      notInterested: item.notInterested,
      interested: item.interested,
    };
  });
}

async function aggregateConversionByOwner(match) {
  const results = await Lead.aggregate([
    { $match: match },
    {
      $addFields: {
        ownerId: { $ifNull: ['$assignedTo', '$createdBy'] },
      },
    },
    {
      $group: {
        _id: '$ownerId',
        total: { $sum: 1 },
        contacted: { $sum: { $cond: [{ $ne: ['$statusTimeline.contactedAt', null] }, 1, 0] } },
        interested: { $sum: { $cond: [{ $eq: ['$status', 'Interested'] }, 1, 0] } },
        treated: { $sum: { $cond: [{ $eq: ['$bucket', 'treated'] }, 1, 0] } },
      },
    },
    { $sort: { interested: -1, contacted: -1, total: -1 } },
    { $limit: 8 },
  ]);

  return results.map((item) => ({
    ownerId: item._id ? item._id.toString() : '',
    total: item.total,
    contacted: item.contacted,
    interested: item.interested,
    treated: item.treated,
    contactRate: item.total ? Number(((item.contacted / item.total) * 100).toFixed(1)) : 0,
    conversionRate: item.total ? Number(((item.interested / item.total) * 100).toFixed(1)) : 0,
  }));
}

async function aggregateCampaignPerformance(match) {
  const results = await Lead.aggregate([
    {
      $match: {
        ...match,
        campaign: { $exists: true, $nin: ['', null] },
      },
    },
    {
      $group: {
        _id: '$campaign',
        total: { $sum: 1 },
        contacted: { $sum: { $cond: [{ $ne: ['$statusTimeline.contactedAt', null] }, 1, 0] } },
        interested: { $sum: { $cond: [{ $eq: ['$status', 'Interested'] }, 1, 0] } },
        treated: { $sum: { $cond: [{ $eq: ['$bucket', 'treated'] }, 1, 0] } },
      },
    },
    { $sort: { interested: -1, total: -1, _id: 1 } },
    { $limit: 8 },
  ]);

  return results.map((item) => ({
    campaign: item._id,
    total: item.total,
    contacted: item.contacted,
    interested: item.interested,
    treated: item.treated,
    contactRate: item.total ? Number(((item.contacted / item.total) * 100).toFixed(1)) : 0,
    conversionRate: item.total ? Number(((item.interested / item.total) * 100).toFixed(1)) : 0,
  }));
}

async function aggregateSlaMetrics(match) {
  const contactedResults = await Lead.aggregate([
    {
      $match: {
        ...match,
        'statusTimeline.contactedAt': { $ne: null },
      },
    },
    {
      $project: {
        firstContactMinutes: {
          $divide: [
            { $subtract: ['$statusTimeline.contactedAt', '$createdAt'] },
            1000 * 60,
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        contactedCount: { $sum: 1 },
        avgFirstContactMinutes: { $avg: '$firstContactMinutes' },
        within24hCount: { $sum: { $cond: [{ $lte: ['$firstContactMinutes', 24 * 60] }, 1, 0] } },
      },
    },
  ]);

  const totalLeads = await Lead.countDocuments(match);
  const contacted = contactedResults[0] || {
    contactedCount: 0,
    avgFirstContactMinutes: 0,
    within24hCount: 0,
  };

  return {
    totalLeads,
    contactedCount: contacted.contactedCount,
    avgFirstContactMinutes: Math.round(contacted.avgFirstContactMinutes || 0),
    within24hCount: contacted.within24hCount || 0,
    within24hRate: contacted.contactedCount ? Number(((contacted.within24hCount / contacted.contactedCount) * 100).toFixed(1)) : 0,
    neverContactedCount: Math.max(0, totalLeads - contacted.contactedCount),
  };
}

function withLeadBucketScope(query, bucket) {
  const bucketQuery = bucket === 'leads'
    ? { $or: [{ bucket: 'leads' }, { bucket: { $exists: false } }, { bucket: null }, { bucket: '' }] }
    : { bucket };

  if (!query || !Object.keys(query).length) {
    return bucketQuery;
  }

  return { $and: [query, bucketQuery] };
}

function mergeQueryClauses(...clauses) {
  const filteredClauses = clauses.filter((clause) => clause && Object.keys(clause).length);
  if (filteredClauses.length === 0) {
    return {};
  }
  if (filteredClauses.length === 1) {
    return filteredClauses[0];
  }
  return { $and: filteredClauses };
}

function buildUnassignedScope(leadScope) {
  return mergeQueryClauses(leadScope, {
    $or: [
      { assignedTo: { $exists: false } },
      { assignedTo: null },
    ],
  });
}

router.get('/', asyncHandler(async (req, res) => {
  const leadScope = buildLeadAccessQuery(req.user);
  const auditQuery = isAdmin(req.user) ? {} : { actor: req.user._id };
  const workLogQuery = isAdmin(req.user) ? {} : { user: req.user._id };
  const recentLeadsQuery = leadScope;
  const now = new Date();
  const staleCutoff = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000));
  const overdueTasksQuery = {
    ...leadScope,
    tasks: { $elemMatch: { completedAt: null, dueAt: { $lt: now } } },
  };
  const staleLeadsQuery = {
    ...leadScope,
    lastActivityAt: { $lte: staleCutoff },
  };
  const unassignedLeadsQuery = buildUnassignedScope(leadScope);

  const openLeadScope = withLeadBucketScope(leadScope, 'leads');

  const [
    totalLeads,
    openLeads,
    interestedLeads,
    users,
    recentLeads,
    announcements,
    workLog,
    unreadNotifications,
    auditFeed,
    newLeads,
    contactedLeads,
    nonQualifiedLeads,
    notInterestedLeads,
    studyFieldBreakdown,
    studyLevelBreakdown,
    financialBreakdown,
    awarenessBreakdown,
    monthlyBreakdown,
    metadataMap,
    overdueLeads,
    staleLeads,
    unassignedLeads,
    overdueLeadsCount,
    staleLeadsCount,
    conversionByOwner,
    campaignPerformance,
    slaMetrics,
  ] = await Promise.all([
    Lead.countDocuments(leadScope),
    Lead.countDocuments(openLeadScope),
    Lead.countDocuments({ ...leadScope, status: 'Interested' }),
    isAdmin(req.user) ? User.find().sort({ name: 1 }) : User.find({ _id: req.user._id }).sort({ name: 1 }),
    Lead.find(recentLeadsQuery)
      .sort({ createdAt: -1 })
      .limit(6)
      .select('name email phone country campaign source status bucket statusTimeline details createdAt updatedAt createdBy assignedTo')
      .populate('createdBy')
      .populate('assignedTo')
      .lean(),
    Announcement.find().sort({ createdAt: -1 }).limit(5).populate('author'),
    WorkSession.find(workLogQuery).sort({ updatedAt: -1 }).limit(10).populate('user'),
    Notification.countDocuments({ user: req.user._id, readAt: null }),
    AuditLog.find(auditQuery).sort({ createdAt: -1 }).limit(10).populate('actor'),
    Lead.countDocuments({ ...leadScope, status: 'New' }),
    Lead.countDocuments({ ...leadScope, status: 'Contacted' }),
    Lead.countDocuments({ ...leadScope, status: 'Non Qualified' }),
    Lead.countDocuments({ ...leadScope, status: 'Not Interested' }),
    aggregateByFieldWithMatch('details.studyField', leadScope),
    aggregateByFieldWithMatch('details.studyLevel', leadScope),
    aggregateByFieldWithMatch('details.financialSituation', leadScope),
    aggregateByFieldWithMatch('details.alternanceAwareness', leadScope),
    aggregateMonthlyBreakdown(leadScope),
    getLeadMetadataMapCached(),
    Lead.find(overdueTasksQuery)
      .sort({ lastActivityAt: 1 })
      .limit(5)
      .select('name email country status bucket duplicateFlag tasks lastActivityAt createdAt updatedAt createdBy assignedTo')
      .populate('createdBy')
      .populate('assignedTo')
      .populate('tasks.createdBy')
      .populate('tasks.completedBy')
      .lean(),
    Lead.find(staleLeadsQuery)
      .sort({ lastActivityAt: 1 })
      .limit(5)
      .select('name email country status bucket duplicateFlag tasks lastActivityAt createdAt updatedAt createdBy assignedTo')
      .populate('createdBy')
      .populate('assignedTo')
      .populate('tasks.createdBy')
      .populate('tasks.completedBy')
      .lean(),
    Lead.countDocuments(unassignedLeadsQuery),
    Lead.countDocuments(overdueTasksQuery),
    Lead.countDocuments(staleLeadsQuery),
    aggregateConversionByOwner(leadScope),
    aggregateCampaignPerformance(leadScope),
    aggregateSlaMetrics(leadScope),
  ]);

  const userMap = new Map(users.map((user) => [user.id, user]));

  res.json({
    stats: {
      totalLeads,
      openLeads,
      activeLeads: newLeads + contactedLeads + interestedLeads,
      convertedLeads: interestedLeads,
      treatedLeads: totalLeads - openLeads,
      agentsActivity: users.filter((user) => user.isOnline).length,
      unreadNotifications,
      overdueTasks: overdueLeadsCount,
      staleLeads: staleLeadsCount,
      unassignedLeads,
    },
    statusBreakdown: [
      { label: 'New', value: newLeads },
      { label: 'Contacted', value: contactedLeads },
      { label: 'Non Qualified', value: nonQualifiedLeads },
      { label: 'Not Interested', value: notInterestedLeads },
      { label: 'Interested', value: interestedLeads },
    ],
    bucketBreakdown: [
      { label: 'Leads', value: openLeads },
      { label: 'Traités', value: totalLeads - openLeads },
    ],
    monthlyBreakdown,
    formBreakdowns: {
      studyField: studyFieldBreakdown,
      studyLevel: studyLevelBreakdown,
      financialSituation: financialBreakdown,
      alternanceAwareness: awarenessBreakdown,
    },
    users: users.map(sanitizeUser),
    recentLeads: recentLeads.map((lead) => serializeLead(lead, metadataMap.get(lead._id.toString()))),
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
    overdueLeads: overdueLeads.map((lead) => serializeLead(lead, metadataMap.get(lead._id.toString()))),
    staleLeads: staleLeads.map((lead) => serializeLead(lead, metadataMap.get(lead._id.toString()))),
    conversionByOwner: conversionByOwner.map((item) => ({
      ...item,
      owner: item.ownerId ? sanitizeUser(userMap.get(item.ownerId) || { _id: item.ownerId, name: 'Unknown', email: '', role: 'commercial', isOnline: false, createdAt: new Date() }) : null,
      ownerLabel: item.ownerId ? (userMap.get(item.ownerId)?.name || 'Unknown') : 'Unassigned',
    })),
    campaignPerformance,
    slaMetrics,
  });
}));

export default router;
