import mongoose from 'mongoose';

const savedLeadFilterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 80 },
  bucket: { type: String, default: 'leads', trim: true },
  search: { type: String, default: '', trim: true, maxlength: 120 },
  status: { type: String, default: '', trim: true, maxlength: 40 },
}, { timestamps: true });

savedLeadFilterSchema.index({ user: 1, createdAt: -1 });

const SavedLeadFilter = mongoose.model('SavedLeadFilter', savedLeadFilterSchema);

export default SavedLeadFilter;
