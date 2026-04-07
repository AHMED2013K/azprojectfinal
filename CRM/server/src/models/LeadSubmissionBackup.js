import mongoose from 'mongoose';

const leadSubmissionBackupSchema = new mongoose.Schema({
  leadId: { type: String, required: true, index: true },
  source: { type: String, default: '' },
  campaign: { type: String, default: '' },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  country: { type: String, default: '' },
  details: {
    type: Object,
    default: {},
  },
  meta: {
    type: Object,
    default: {},
  },
  backedUpAt: { type: Date, default: Date.now, index: true },
}, { timestamps: true });

const LeadSubmissionBackup = mongoose.model('LeadSubmissionBackup', leadSubmissionBackupSchema);

export default LeadSubmissionBackup;
