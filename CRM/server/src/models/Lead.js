import mongoose from 'mongoose';
import { LEAD_BUCKETS, LEAD_STATUSES } from '../constants/index.js';

const noteSchema = new mongoose.Schema({
  body: { type: String, required: true, trim: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

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
  notes: [noteSchema],
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
