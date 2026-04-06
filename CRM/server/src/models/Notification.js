import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, default: '' },
  readAt: { type: Date, default: null },
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
