import Message from '../models/Message.js';
import User from '../models/User.js';
import { createConversationId } from '../utils/conversation.js';
import { serializeMessage } from '../utils/serializers.js';

export function attachSocketHandlers(io) {
  io.on('connection', async (socket) => {
    const userId = socket.user._id.toString();
    socket.join(`user:${userId}`);

    socket.user.isOnline = true;
    socket.user.lastSeenAt = new Date();
    await socket.user.save();
    io.emit('presence:update', { userId, isOnline: true, lastSeenAt: socket.user.lastSeenAt });

    socket.on('chat:send', async ({ recipientId, body }) => {
      if (!recipientId || !body?.trim()) {
        return;
      }

      const message = await Message.create({
        conversationId: createConversationId(userId, recipientId),
        sender: userId,
        recipient: recipientId,
        body: body.trim(),
      });

      const populated = await Message.findById(message._id).populate('sender').populate('recipient');
      const payload = serializeMessage(populated);
      io.to(`user:${userId}`).to(`user:${recipientId}`).emit('chat:message', payload);
    });

    socket.on('disconnect', async () => {
      const user = await User.findById(userId);
      if (!user) {
        return;
      }

      const hasOtherActiveSockets = Boolean(io.sockets.adapter.rooms.get(`user:${userId}`)?.size);
      user.isOnline = hasOtherActiveSockets;
      user.lastSeenAt = new Date();
      await user.save();
      io.emit('presence:update', { userId, isOnline: user.isOnline, lastSeenAt: user.lastSeenAt });
    });
  });
}
