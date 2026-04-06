import { z } from 'zod';
import { LEAD_STATUSES } from '../constants/index.js';

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid identifier');
const emailSchema = z.string().email('A valid email is required').transform((value) => value.toLowerCase());
const birthDateSchema = z.string()
  .trim()
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date de naissance: format jj/mm/aaaa requis');

const leadBase = {
  name: z.string().trim().min(2, 'Name is required').max(120, 'Name is too long'),
  email: emailSchema,
  phone: z.string().trim().max(30, 'Phone is too long').optional().default(''),
  country: z.string().trim().max(80, 'Country is too long').optional().default(''),
  campaign: z.string().trim().max(120, 'Campaign is too long').optional().default(''),
  status: z.enum(LEAD_STATUSES).optional().default('New'),
  assignedTo: z.string().trim().optional(),
};

export const createLeadSchema = z.object({
  body: z.object(leadBase),
});

export const updateLeadSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z.object({
    name: leadBase.name.optional(),
    email: emailSchema.optional(),
    phone: leadBase.phone,
    country: leadBase.country,
    campaign: leadBase.campaign,
    status: z.enum(LEAD_STATUSES).optional(),
    assignedTo: objectIdSchema.nullable().optional(),
  }),
});

export const noteSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z.object({
    body: z.string().trim().min(1, 'Note body is required').max(1000, 'Note is too long'),
  }),
});

export const createInviteSchema = z.object({
  body: z.object({
    campaign: z.string().trim().max(120, 'Campaign is too long').optional().default(''),
  }),
});

export const publicLeadSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Name is required').max(120, 'Name is too long'),
    email: emailSchema,
    phone: z.string().trim().min(6, 'Phone is required').max(30, 'Phone is too long'),
    country: z.string().trim().min(2, 'Country is required').max(80, 'Country is too long'),
    dateOfBirth: birthDateSchema,
    studyField: z.string().trim().min(2, 'Study field is required').max(120, 'Study field is too long'),
    studyLevel: z.string().trim().min(2, 'Study level is required').max(80, 'Study level is too long'),
    alternanceAwareness: z.string().trim().min(2, 'Please select an option').max(160, 'Answer is too long'),
    financialSituation: z.string().trim().min(2, 'Please select an option').max(160, 'Answer is too long'),
    message: z.string().trim().max(2000, 'Message is too long').optional().default(''),
  }),
});

export const leadQuerySchema = z.object({
  query: z.object({
    search: z.string().optional().default(''),
    status: z.enum(['', ...LEAD_STATUSES]).optional().default(''),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  }),
});
