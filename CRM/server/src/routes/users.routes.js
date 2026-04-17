import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest, notFound } from '../utils/errors.js';
import { sanitizeUser } from '../utils/serializers.js';
import { createUserSchema } from '../validators/auth.validators.js';
import { createAuditLog } from '../utils/audit.js';
import { USER_ROLES } from '../constants/index.js';

const router = express.Router();

router.get('/', requireRole('admin'), asyncHandler(async (req, res) => {
  const q = String(req.query.q || '').trim();
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
  const query = q
    ? {
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } },
          { role: { $regex: q, $options: 'i' } },
        ],
      }
    : {};

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).sort({ name: 1 }).skip((page - 1) * limit).limit(limit),
  ]);

  res.json({
    users: users.map(sanitizeUser),
    pagination: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) },
  });
}));

router.post('/', requireRole('admin'), validate(createUserSchema), asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.validated.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'A user with this email already exists' });
  }

  const user = await User.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 12),
    role,
  });
  await createAuditLog({
    actor: req.user._id,
    action: 'user.created',
    targetType: 'user',
    targetId: user._id.toString(),
    details: { role: user.role, email: user.email },
  });

  res.status(201).json({ user: sanitizeUser(user) });
}));

router.patch('/:id/role', requireRole('admin'), asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw notFound('User not found');
  }

  if (req.body.role && !USER_ROLES.includes(req.body.role)) {
    throw badRequest('Invalid role');
  }

  user.role = req.body.role || user.role;
  await user.save();

  res.json({ user: sanitizeUser(user) });
}));

export default router;
