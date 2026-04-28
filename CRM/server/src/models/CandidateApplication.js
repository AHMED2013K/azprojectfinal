import mongoose from 'mongoose';

const candidateApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  experienceYears: { type: Number, default: 0, min: 0, max: 50 },
  experienceMonths: { type: Number, default: 0, min: 0, max: 11 },
  studyField: { type: String, required: true, trim: true },
  languages: {
    frenchLevel: { type: String, default: '' },
    englishLevel: { type: String, default: '' },
    otherLanguage: { type: String, default: '' },
    otherLanguageLevel: { type: String, default: '' },
  },
  summerInternshipAvailable: { type: Boolean, default: false },
  summerInternshipMonths: { type: Number, default: null, min: 1, max: 6 },
  hoursPerDayAvailable: { type: Number, required: true, min: 1, max: 24 },
  workMode: { type: String, required: true, trim: true },
  source: { type: String, default: 'student-job-form' },
  cvFileName: { type: String, required: true },
  cvMimeType: { type: String, required: true },
  cvSizeBytes: { type: Number, required: true },
  cvData: { type: Buffer, required: true, select: false },
}, { timestamps: true });

candidateApplicationSchema.index({ createdAt: -1 });
candidateApplicationSchema.index({ email: 1, createdAt: -1 });
candidateApplicationSchema.index({ workMode: 1, summerInternshipAvailable: 1, createdAt: -1 });

const CandidateApplication = mongoose.model('CandidateApplication', candidateApplicationSchema);

export default CandidateApplication;
