import express from 'express';
import Message from '../models/Message.js';
import User from '../models/User.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest, notFound } from '../utils/errors.js';
import { createConversationId } from '../utils/conversation.js';
import { serializeMessage, sanitizeUser } from '../utils/serializers.js';
import { messageSchema } from '../validators/app.validators.js';

const router = express.Router();

router.get('/users', asyncHandler(async (_req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.json({ users: users.map(sanitizeUser) });
}));

router.get('/unread-count', asyncHandler(async (req, res) => {
  const results = await Message.aggregate([
    { $match: { recipient: req.user._id, readAt: null } },
    { $group: { _id: '$sender', count: { $sum: 1 } } },
  ]);

  const byUser = Object.fromEntries(results.map((item) => [item._id.toString(), item.count]));
  const total = results.reduce((sum, item) => sum + item.count, 0);
  res.json({ total, byUser });
}));

router.get('/messages/:recipientId', asyncHandler(async (req, res) => {
  const conversationId = createConversationId(req.user._id, req.params.recipientId);
  const readAt = new Date();
  await Message.updateMany({
    conversationId,
    sender: req.params.recipientId,
    recipient: req.user._id,
    readAt: null,
  }, { $set: { readAt } });

  const messages = await Message.find({ conversationId })
    .sort({ createdAt: 1 })
    .populate('sender')
    .populate('recipient');

  req.app.get('io').to(`user:${req.user._id.toString()}`).emit('chat:read', {
    conversationId,
    otherUserId: req.params.recipientId,
  });

  res.json({ messages: messages.map(serializeMessage) });
}));

router.post('/messages/:recipientId/read', asyncHandler(async (req, res) => {
  const conversationId = createConversationId(req.user._id, req.params.recipientId);
  await Message.updateMany({
    conversationId,
    sender: req.params.recipientId,
    recipient: req.user._id,
    readAt: null,
  }, { $set: { readAt: new Date() } });

  req.app.get('io').to(`user:${req.user._id.toString()}`).emit('chat:read', {
    conversationId,
    otherUserId: req.params.recipientId,
  });

  res.json({ message: 'Conversation marked as read' });
}));

router.post('/messages/:recipientId', validate(messageSchema), asyncHandler(async (req, res) => {
  const recipient = await User.findById(req.params.recipientId);
  if (!recipient) {
    throw notFound('Recipient not found');
  }
  if (recipient._id.toString() === req.user._id.toString()) {
    throw badRequest('You cannot send a message to yourself');
  }

  const message = await Message.create({
    conversationId: createConversationId(req.user._id, req.params.recipientId),
    sender: req.user._id,
    recipient: req.params.recipientId,
    body: req.validated.body.body,
  });

  const populated = await Message.findById(message._id).populate('sender').populate('recipient');
  const payload = serializeMessage(populated);

  req.app.get('io')
    .to(`user:${req.user._id.toString()}`)
    .to(`user:${req.params.recipientId}`)
    .emit('chat:message', payload);

  req.app.get('io')
    .to(`user:${req.params.recipientId}`)
    .emit('chat:unread', { senderId: req.user._id.toString(), message: payload });

  res.status(201).json({ message: payload });
}));

export default router;
