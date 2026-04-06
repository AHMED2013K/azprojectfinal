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

router.get('/messages/:recipientId', asyncHandler(async (req, res) => {
  const conversationId = createConversationId(req.user._id, req.params.recipientId);
  const messages = await Message.find({ conversationId })
    .sort({ createdAt: 1 })
    .populate('sender')
    .populate('recipient');

  res.json({ messages: messages.map(serializeMessage) });
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

  res.status(201).json({ message: payload });
}));

export default router;
