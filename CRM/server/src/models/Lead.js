import mongoose from 'mongoose';
import { LEAD_BUCKETS, LEAD_STATUSES } from '../constants/index.js';

const noteSchema = new mongoose.Schema({
  body: { type: String, required: true, trim: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true, trim: true },
  label: { type: String, required: true, trim: true },
  meta: { type: mongoose.Schema.Types.Mixed, default: {} },
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: () => new Date() },
}, { _id: true });

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  country: { type: String, default: '' },
  campaign: { type: String, default: '' },
  source: { type: String, default: 'manual' },
  status: { type: String, enum: LEAD_STATUSES, default: 'New' },
  bucket: { type: String, enum: LEAD_BUCKETS, default: 'leads' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  inviteToken: { type: String, default: '' },
  statusTimeline: {
    contactedAt: { type: Date, default: null },
    nonQualifiedAt: { type: Date, default: null },
    notInterestedAt: { type: Date, default: null },
    interestedAt: { type: Date, default: null },
  },
  details: {
    dateOfBirth: { type: String, default: '' },
    age: { type: Number, default: null },
    studyField: { type: String, default: '' },
    studyLevel: { type: String, default: '' },
    alternanceAwareness: { type: String, default: '' },
    financialSituation: { type: String, default: '' },
    message: { type: String, default: '' },
  },
  lastActivityAt: { type: Date, default: () => new Date(), index: true },
  notes: [noteSchema],
  activityLog: [activitySchema],
}, { timestamps: true });

leadSchema.index({ createdAt: -1 });
leadSchema.index({ email: 1 });
leadSchema.index({ phone: 1 });
leadSchema.index({ bucket: 1, status: 1, createdAt: -1 });
leadSchema.index({ createdBy: 1, bucket: 1, createdAt: -1 });
leadSchema.index({ assignedTo: 1, bucket: 1, createdAt: -1 });
leadSchema.index({ campaign: 1, createdAt: -1 });
leadSchema.index({ bucket: 1, lastActivityAt: -1 });

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
