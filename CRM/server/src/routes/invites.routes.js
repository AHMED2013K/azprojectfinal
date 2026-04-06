import express from 'express';
import crypto from 'node:crypto';
import InviteLink from '../models/InviteLink.js';
import Lead from '../models/Lead.js';
import User from '../models/User.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { notFound } from '../utils/errors.js';
import { createInviteSchema, publicLeadSchema } from '../validators/lead.validators.js';
import { createAuditLog } from '../utils/audit.js';
import { backupLeadSubmission, calculateAgeFromBirthDate, notifyNewLead } from '../utils/leadIntake.js';

const router = express.Router();

router.get('/:token/public', asyncHandler(async (req, res) => {
  const invite = await InviteLink.findOne({ token: req.params.token, active: true });
  if (!invite) {
    throw notFound('Invite link not found');
  }

  res.json({
    invite: {
      token: invite.token,
      campaign: invite.campaign,
    },
  });
}));

router.post('/:token/public', validate(publicLeadSchema), asyncHandler(async (req, res) => {
  const invite = await InviteLink.findOne({ token: req.params.token, active: true });
  if (!invite) {
    throw notFound('Invite link not found');
  }

  const {
    name,
    email,
    phone,
    country,
    dateOfBirth,
    studyField,
    studyLevel,
    alternanceAwareness,
    financialSituation,
    message,
  } = req.validated.body;

  const admin = await User.findOne({ role: 'admin' });
  const lead = await Lead.create({
    name,
    email,
    phone: phone || '',
    country: country || '',
    campaign: invite.campaign,
    source: 'public-form',
    createdBy: admin?._id,
    inviteToken: invite.token,
    details: {
      dateOfBirth,
      age: calculateAgeFromBirthDate(dateOfBirth),
      studyField,
      studyLevel,
      alternanceAwareness,
      financialSituation,
      message,
    },
  });
  await createAuditLog({
    action: 'lead.public_submitted',
    targetType: 'invite',
    targetId: invite._id.toString(),
    details: { campaign: invite.campaign, email },
  });
  await backupLeadSubmission(lead, { route: 'invite-public', inviteToken: invite.token });
  await notifyNewLead(req, lead);

  res.status(201).json({ message: 'Lead submitted successfully' });
}));

router.post('/public/linkedin-alternance-2026', validate(publicLeadSchema), asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    country,
    dateOfBirth,
    studyField,
    studyLevel,
    alternanceAwareness,
    financialSituation,
    message,
  } = req.validated.body;

  const admin = await User.findOne({ role: 'admin' });
  const lead = await Lead.create({
    name,
    email,
    phone: phone || '',
    country: country || '',
    campaign: 'LinkedIn Alternance Septembre 2026',
    source: 'linkedin-form',
    createdBy: admin?._id,
    details: {
      dateOfBirth,
      age: calculateAgeFromBirthDate(dateOfBirth),
      studyField,
      studyLevel,
      alternanceAwareness,
      financialSituation,
      message,
    },
  });

  await createAuditLog({
    action: 'lead.linkedin_public_submitted',
    targetType: 'campaign',
    details: { campaign: 'LinkedIn Alternance Septembre 2026', email },
  });
  await backupLeadSubmission(lead, { route: 'linkedin-public' });
  await notifyNewLead(req, lead);

  res.status(201).json({ message: 'Application submitted successfully' });
}));

router.use(authMiddleware);

router.get('/', asyncHandler(async (_req, res) => {
  const invites = await InviteLink.find().sort({ createdAt: -1 });
  res.json({ invites: invites.map((invite) => ({
    id: invite._id.toString(),
    token: invite.token,
    campaign: invite.campaign,
    active: invite.active,
    createdAt: invite.createdAt,
    url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/public/${invite.token}`,
  })) });
}));

router.post('/', requireRole('admin'), validate(createInviteSchema), asyncHandler(async (req, res) => {
  const token = crypto.randomBytes(12).toString('hex');
  const invite = await InviteLink.create({
    token,
    campaign: req.validated.body.campaign,
    createdBy: req.user._id,
  });
  await createAuditLog({
    actor: req.user._id,
    action: 'invite.created',
    targetType: 'invite',
    targetId: invite._id.toString(),
    details: { campaign: invite.campaign },
  });

  res.status(201).json({
    invite: {
      id: invite._id.toString(),
      token,
      campaign: invite.campaign,
      active: invite.active,
      createdAt: invite.createdAt,
      url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/public/${token}`,
    },
  });
}));

export default router;
