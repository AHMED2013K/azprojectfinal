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
    role: z.enum(['admin', 'commercial']),
  }),
});
