import express from 'express';
import Announcement from '../models/Announcement.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sanitizeUser } from '../utils/serializers.js';
import { announcementSchema } from '../validators/app.validators.js';
import { createAuditLog } from '../utils/audit.js';

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
  const announcements = await Announcement.find().sort({ createdAt: -1 }).populate('author');
  res.json({
    announcements: announcements.map((announcement) => ({
      id: announcement._id.toString(),
      title: announcement.title,
      body: announcement.body,
      createdAt: announcement.createdAt,
      author: sanitizeUser(announcement.author),
    })),
  });
}));

router.post('/', requireRole('admin'), validate(announcementSchema), asyncHandler(async (req, res) => {
  const { title, body } = req.validated.body;

  const announcement = await Announcement.create({
    title,
    body,
    author: req.user._id,
  });

  const users = await User.find({}, '_id');
  await Notification.insertMany(users.map((user) => ({
    user: user._id,
    type: 'announcement',
    title,
    body,
  })));

  const populated = await Announcement.findById(announcement._id).populate('author');
  const payload = {
    id: populated._id.toString(),
    title: populated.title,
    body: populated.body,
    createdAt: populated.createdAt,
    author: sanitizeUser(populated.author),
  };

  await createAuditLog({
    actor: req.user._id,
    action: 'announcement.created',
    targetType: 'announcement',
    targetId: populated._id.toString(),
  });
  req.app.get('io').emit('announcement:new', payload);
  res.status(201).json({ announcement: payload });
}));

export default router;
