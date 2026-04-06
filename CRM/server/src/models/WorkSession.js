import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  type: { type: String, enum: ['start', 'pause', 'resume', 'end'], required: true },
  timestamp: { type: Date, required: true, default: () => new Date() },
}, { _id: false });

const workSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  dateKey: { type: String, required: true, index: true },
  startedAt: { type: Date, default: null },
  endedAt: { type: Date, default: null },
  active: { type: Boolean, default: false },
  paused: { type: Boolean, default: false },
  totalWorkedMinutes: { type: Number, default: 0 },
  lastResumedAt: { type: Date, default: null },
  events: [eventSchema],
}, { timestamps: true });

const WorkSession = mongoose.model('WorkSession', workSessionSchema);

export default WorkSession;
