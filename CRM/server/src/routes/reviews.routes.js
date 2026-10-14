import express from 'express';
import Review from '../models/Review.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { authMiddleware, csrfProtection, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createAuditLog } from '../utils/audit.js';
import { createIpAllowlistMiddleware } from '../utils/security.js';
import { getEnv } from '../config/env.js';
import { reviewParamsSchema, reviewQuerySchema, reviewUpdateSchema, publicReviewSchema } from '../validators/review.validators.js';

const router = express.Router();
const serialize = (review) => ({ id: review._id.toString(), name: review.name, content: review.content, source: review.source, status: review.status, reviewedAt: review.reviewedAt || null, reviewedBy: review.reviewedBy?.name || null, createdAt: review.createdAt });

router.post('/public', validate(publicReviewSchema), asyncHandler(async (req, res) => {
  const review = await Review.create({ name: req.validated.body.name, content: req.validated.body.content });
  const admins = await User.find({ role: 'admin' }, '_id');
  const title = 'Nouvel avis à valider';
  const body = `${review.name} a envoyé un avis depuis le site.`;
  if (admins.length) await Notification.insertMany(admins.map((user) => ({ user: user._id, type: 'review', title, body })));
  req.app.get('io').emit('notification:new', { id: `${review._id}-review`, type: 'review', source: 'website-review', title, body, createdAt: new Date().toISOString() });
  res.status(201).json({ message: 'Votre avis a été envoyé pour validation.' });
}));

router.get('/public', asyncHandler(async (_req, res) => {
  const reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 }).limit(30);
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.json({ reviews: reviews.map(serialize) });
}));

router.use(authMiddleware, createIpAllowlistMiddleware(getEnv().CRM_ALLOWED_IPS_LIST), csrfProtection);
router.use(requireRole('admin'));
router.get('/', validate(reviewQuerySchema), asyncHandler(async (req, res) => {
  const query = req.validated.query.status ? { status: req.validated.query.status } : {};
  const reviews = await Review.find(query).populate('reviewedBy', 'name').sort({ createdAt: -1 }).limit(200);
  res.json({ reviews: reviews.map(serialize) });
}));
router.patch('/:id', validate(reviewParamsSchema.merge(reviewUpdateSchema)), asyncHandler(async (req, res) => {
  const review = await Review.findById(req.validated.params.id);
  if (!review) { const error = new Error('Avis introuvable'); error.status = 404; throw error; }
  const previousStatus = review.status;
  review.status = req.validated.body.status;
  review.reviewedAt = new Date();
  review.reviewedBy = req.user._id;
  await review.save();
  await review.populate('reviewedBy', 'name');
  await createAuditLog({ actor: req.user._id, action: 'review.moderated', targetType: 'review', targetId: review._id.toString(), details: { previousStatus, nextStatus: review.status } });
  res.json({ review: serialize(review) });
}));
export default router;
