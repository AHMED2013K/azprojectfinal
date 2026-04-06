import express from 'express';
import Notification from '../models/Notification.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { notFound } from '../utils/errors.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20);
  res.json({
    notifications,
    unreadCount: notifications.filter((item) => !item.readAt).length,
  });
}));

router.post('/:id/read', asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({ _id: req.params.id, user: req.user._id });
  if (!notification) {
    throw notFound('Notification not found');
  }

  notification.readAt = new Date();
  await notification.save();
  res.json({ notification });
}));

router.post('/read-all', asyncHandler(async (req, res) => {
  await Notification.updateMany({ user: req.user._id, readAt: null }, { $set: { readAt: new Date() } });
  res.json({ message: 'All notifications marked as read' });
}));

export default router;
