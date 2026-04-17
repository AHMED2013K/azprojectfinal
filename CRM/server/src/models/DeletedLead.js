import mongoose from 'mongoose';

const deletedLeadSchema = new mongoose.Schema({
  originalLeadId: { type: String, required: true, index: true },
  snapshot: { type: Object, required: true, default: {} },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  deletedAt: { type: Date, default: Date.now, index: true },
  reason: { type: String, default: 'manual-delete', trim: true },
  restoreToken: { type: String, required: true, index: true },
  restoredAt: { type: Date, default: null },
  restoredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

deletedLeadSchema.index({ deletedAt: -1 });

const DeletedLead = mongoose.model('DeletedLead', deletedLeadSchema);

export default DeletedLead;
