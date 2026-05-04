import express from 'express';
import WorkSession from '../models/WorkSession.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest } from '../utils/errors.js';
import { trackingActionSchema } from '../validators/app.validators.js';
import { requireRole } from '../middleware/auth.js';

const router = express.Router();

function getDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function minutesBetween(start, end) {
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000));
}

async function getOrCreateSession(userId) {
  const dateKey = getDateKey();
  let session = await WorkSession.findOne({ user: userId, dateKey });

  if (!session) {
    session = await WorkSession.create({ user: userId, dateKey });
  }

  return session;
}

router.get('/me', asyncHandler(async (req, res) => {
  const session = await getOrCreateSession(req.user._id);
  res.json({ session });
}));

router.post('/action', validate(trackingActionSchema), asyncHandler(async (req, res) => {
  const { action } = req.validated.body;

  const session = await getOrCreateSession(req.user._id);
  const now = new Date();

  if (action === 'start') {
    if (!session.startedAt) {
      session.startedAt = now;
    }
    session.active = true;
    session.paused = false;
    session.lastResumedAt = now;
  }

  if (action === 'pause') {
    if (!session.active || session.paused || !session.lastResumedAt) {
      throw badRequest('Cannot pause before starting work');
    }
    session.totalWorkedMinutes += minutesBetween(session.lastResumedAt, now);
    session.paused = true;
    session.lastResumedAt = null;
  }

  if (action === 'resume') {
    if (!session.startedAt || !session.paused) {
      throw badRequest('Cannot resume before pausing');
    }
    session.active = true;
    session.paused = false;
    session.lastResumedAt = now;
  }

  if (action === 'end') {
    if (!session.startedAt) {
      session.startedAt = now;
    }
    if (session.lastResumedAt) {
      session.totalWorkedMinutes += minutesBetween(session.lastResumedAt, now);
    }
    session.active = false;
    session.paused = false;
    session.lastResumedAt = null;
    session.endedAt = now;
  }

  session.events.push({ type: action, timestamp: now });
  await session.save();

  req.app.get('io').emit('tracking:updated', {
    userId: req.user._id.toString(),
    session,
  });

  res.json({ session });
}));

router.get('/users', requireRole('admin'), asyncHandler(async (_req, res) => {
  const sessions = await WorkSession.find().sort({ updatedAt: -1 }).populate('user');
  res.json({
    sessions: sessions.map((session) => ({
      id: session._id.toString(),
      user: {
        id: session.user._id.toString(),
        name: session.user.name,
        email: session.user.email,
      },
      dateKey: session.dateKey,
      startedAt: session.startedAt,
      endedAt: session.endedAt,
      totalWorkedMinutes: session.totalWorkedMinutes,
      active: session.active,
      paused: session.paused,
      events: session.events,
    })),
  });
}));

export default router;
