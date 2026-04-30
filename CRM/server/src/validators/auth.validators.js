import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(128, 'Password is too long')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/[a-z]/, 'Password must contain a lowercase letter')
  .regex(/[0-9]/, 'Password must contain a number');

const emailSchema = z.string().email('A valid email is required').transform((value) => value.toLowerCase());

export const loginSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
    otpCode: z.string().trim().min(6, 'Two-factor code must contain 6 digits').max(8, 'Two-factor code is too long').optional(),
    recoveryCode: z.string().trim().min(8, 'Recovery code is too short').max(16, 'Recovery code is too long').optional(),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Name is required').max(80, 'Name is too long'),
    email: emailSchema,
    password: passwordSchema,
    role: z.enum(['admin', 'manager', 'commercial', 'viewer']),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Name is required').max(80, 'Name is too long').optional(),
    email: emailSchema.optional(),
    password: z.preprocess(
      (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
      passwordSchema.optional(),
    ),
    role: z.enum(['admin', 'manager', 'commercial', 'viewer']).optional(),
  }).refine((body) => Object.values(body).some((value) => value !== undefined), {
    message: 'At least one field is required',
  }),
});

export const twoFactorSetupSchema = z.object({
  body: z.object({
    password: z.string().min(1, 'Current password is required'),
  }),
});

export const twoFactorVerifySchema = z.object({
  body: z.object({
    code: z.string().trim().regex(/^\d{6}$/, 'Enter a valid 6-digit code'),
    password: z.string().min(1, 'Current password is required'),
  }),
});

export const passwordResetRequestSchema = z.object({
  body: z.object({
    email: emailSchema,
  }),
});

export const passwordResetConfirmSchema = z.object({
  body: z.object({
    token: z.string().trim().min(20, 'Reset token is invalid'),
    newPassword: passwordSchema,
  }),
});

export const sessionActionSchema = z.object({
  params: z.object({
    sessionId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid session identifier'),
  }),
});
