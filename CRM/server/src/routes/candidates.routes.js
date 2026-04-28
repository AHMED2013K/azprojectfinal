import express from 'express';
import path from 'node:path';
import multer from 'multer';
import CandidateApplication from '../models/CandidateApplication.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { authMiddleware, csrfProtection } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest, notFound } from '../utils/errors.js';
import { createAuditLog } from '../utils/audit.js';
import { createIpAllowlistMiddleware, escapeRegExp } from '../utils/security.js';
import { getEnv } from '../config/env.js';
import { candidateParamsSchema, candidateQuerySchema, candidateUpdateSchema, publicCandidateApplicationSchema } from '../validators/candidate.validators.js';
import { serializeCandidateApplication } from '../utils/serializers.js';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    const isPdfMime = String(file.mimetype || '').includes('pdf');
    const isPdfExtension = path.extname(file.originalname || '').toLowerCase() === '.pdf';
    if (!isPdfMime && !isPdfExtension) {
      callback(badRequest('Le CV doit etre fourni au format PDF'));
      return;
    }
    callback(null, true);
  },
});

function handleCvUpload(req, res, next) {
  upload.single('cv')(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error.code === 'LIMIT_FILE_SIZE') {
      next({ status: 400, message: 'Le CV PDF ne doit pas depasser 5 Mo' });
      return;
    }

    next({
      status: error.status || 400,
      message: error.message || 'Impossible de televerser le CV',
    });
  });
}

router.post('/public/student-job', handleCvUpload, validate(publicCandidateApplicationSchema), asyncHandler(async (req, res) => {
  if (!req.file?.buffer) {
    throw badRequest('Le CV PDF est obligatoire');
  }

  const admin = await User.findOne({ role: 'admin' });
  const application = await CandidateApplication.create({
    name: req.validated.body.name,
    email: req.validated.body.email,
    phone: req.validated.body.phone,
    experienceYears: req.validated.body.experienceYears,
    experienceMonths: req.validated.body.experienceMonths,
    studyField: req.validated.body.studyField,
    languages: {
      frenchLevel: req.validated.body.frenchLevel,
      englishLevel: req.validated.body.englishLevel,
      otherLanguage: req.validated.body.otherLanguage,
      otherLanguageLevel: req.validated.body.otherLanguageLevel,
    },
    summerInternshipAvailable: req.validated.body.summerInternshipAvailable === 'yes',
    summerInternshipMonths: req.validated.body.summerInternshipMonths,
    hoursPerDayAvailable: req.validated.body.hoursPerDayAvailable,
    workMode: req.validated.body.workMode,
    cvFileName: req.file.originalname || 'cv.pdf',
    cvMimeType: req.file.mimetype || 'application/pdf',
    cvSizeBytes: req.file.size || req.file.buffer.length,
    cvData: req.file.buffer,
  });

  await createAuditLog({
    actor: admin?._id || null,
    action: 'candidate.public_submitted',
    targetType: 'candidate-application',
    targetId: application._id.toString(),
    details: {
      email: application.email,
      source: application.source,
      workMode: application.workMode,
    },
  });

  const users = await User.find({}, '_id');
  const title = 'Nouvelle candidature job recue';
  const body = `${application.name} a postule via le formulaire student-job.`;
  if (users.length) {
    await Notification.insertMany(users.map((user) => ({
      user: user._id,
      type: 'candidate',
      title,
      body,
    })));
  }

  req.app.get('io').emit('notification:new', {
    id: `${application._id.toString()}-candidate-notification`,
    type: 'candidate',
    source: application.source,
    title,
    body,
    createdAt: new Date().toISOString(),
  });

  req.app.get('io').emit('candidate:created', {
    application: serializeCandidateApplication(application),
  });

  res.status(201).json({ message: 'Application submitted successfully' });
}));

router.use(authMiddleware, createIpAllowlistMiddleware(getEnv().CRM_ALLOWED_IPS_LIST), csrfProtection);

router.get('/', validate(candidateQuerySchema), asyncHandler(async (req, res) => {
  const { search, workMode, internship, bucket, reviewStatus, page, limit } = req.validated.query;
  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: escapeRegExp(search), $options: 'i' } },
      { email: { $regex: escapeRegExp(search), $options: 'i' } },
      { phone: { $regex: escapeRegExp(search), $options: 'i' } },
      { studyField: { $regex: escapeRegExp(search), $options: 'i' } },
      { 'languages.otherLanguage': { $regex: escapeRegExp(search), $options: 'i' } },
    ];
  }

  if (workMode) {
    query.workMode = workMode;
  }

  if (internship) {
    query.summerInternshipAvailable = internship === 'yes';
  }

  if (bucket) {
    query.bucket = bucket === 'active'
      ? { $in: ['active', null] }
      : 'treated';
  }

  if (reviewStatus) {
    query.reviewStatus = reviewStatus === 'pending'
      ? { $in: ['pending', null] }
      : reviewStatus;
  }

  const [applications, total] = await Promise.all([
    CandidateApplication.find(query)
      .populate('reviewedBy', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    CandidateApplication.countDocuments(query),
  ]);

  res.json({
    applications: applications.map((item) => serializeCandidateApplication(item)),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  });
}));

router.get('/:id/cv', validate(candidateParamsSchema), asyncHandler(async (req, res) => {
  const application = await CandidateApplication.findById(req.validated.params.id).select('+cvData');
  if (!application) {
    throw notFound('Candidate application not found');
  }

  res.setHeader('Content-Type', application.cvMimeType || 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(application.cvFileName || 'cv.pdf')}"`);
  res.send(application.cvData);
}));

router.get('/:id', validate(candidateParamsSchema), asyncHandler(async (req, res) => {
  const application = await CandidateApplication.findById(req.validated.params.id).populate('reviewedBy', 'name');
  if (!application) {
    throw notFound('Candidate application not found');
  }

  res.json({ application: serializeCandidateApplication(application) });
}));

router.patch('/:id', validate(candidateParamsSchema.merge(candidateUpdateSchema)), asyncHandler(async (req, res) => {
  const application = await CandidateApplication.findById(req.validated.params.id).populate('reviewedBy', 'name');
  if (!application) {
    throw notFound('Candidate application not found');
  }

  const previousBucket = application.bucket;
  const previousReviewStatus = application.reviewStatus;
  const { bucket, reviewStatus } = req.validated.body;

  if (bucket) {
    application.bucket = bucket;
  }

  if (reviewStatus) {
    application.reviewStatus = reviewStatus;
    if (reviewStatus === 'pending') {
      application.reviewedAt = null;
      application.reviewedBy = null;
    } else {
      application.reviewedAt = new Date();
      application.reviewedBy = req.user._id;
    }
  }

  await application.save();
  await application.populate('reviewedBy', 'name');

  await createAuditLog({
    actor: req.user._id,
    action: 'candidate.updated',
    targetType: 'candidate-application',
    targetId: application._id.toString(),
    details: {
      previousBucket,
      nextBucket: application.bucket,
      previousReviewStatus,
      nextReviewStatus: application.reviewStatus,
    },
  });

  req.app.get('io').emit('candidate:updated', {
    application: serializeCandidateApplication(application),
  });

  res.json({ application: serializeCandidateApplication(application) });
}));

router.delete('/:id', validate(candidateParamsSchema), asyncHandler(async (req, res) => {
  const application = await CandidateApplication.findById(req.validated.params.id);
  if (!application) {
    throw notFound('Candidate application not found');
  }

  await createAuditLog({
    actor: req.user._id,
    action: 'candidate.deleted',
    targetType: 'candidate-application',
    targetId: application._id.toString(),
    details: {
      email: application.email,
      bucket: application.bucket,
      reviewStatus: application.reviewStatus,
    },
  });

  await CandidateApplication.deleteOne({ _id: application._id });

  req.app.get('io').emit('candidate:deleted', {
    id: application._id.toString(),
  });

  res.json({ deletedId: application._id.toString() });
}));

export default router;
