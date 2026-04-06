import mongoose from 'mongoose';

const inviteLinkSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true, index: true },
  campaign: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const InviteLink = mongoose.model('InviteLink', inviteLinkSchema);

export default InviteLink;
