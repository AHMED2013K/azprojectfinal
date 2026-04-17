import { z } from 'zod';
import { LEAD_BUCKETS, LEAD_STATUSES } from '../constants/index.js';

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid identifier');
const emailSchema = z.string().email('A valid email is required').transform((value) => value.toLowerCase());
const quickFilterSchema = z.enum(['', 'duplicates', 'overdue', 'stale', 'unassigned']);

function normalizeBirthDateInput(value) {
  const rawValue = String(value || '').trim();
  if (!rawValue) {
    return rawValue;
  }

  const isoMatch = rawValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return `${day}/${month}/${year}`;
  }

  return rawValue;
}

const birthDateSchema = z.string()
  .trim()
  .transform(normalizeBirthDateInput)
  .pipe(z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date de naissance: format jj/mm/aaaa requis'));

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
    phone: z.string().trim().max(30, 'Phone is too long').optional(),
    country: z.string().trim().max(80, 'Country is too long').optional(),
    campaign: z.string().trim().max(120, 'Campaign is too long').optional(),
    status: z.enum(LEAD_STATUSES).optional(),
    bucket: z.enum(LEAD_BUCKETS).optional(),
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

export const taskSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z.object({
    title: z.string().trim().min(2, 'Task title is required').max(160, 'Task title is too long'),
    dueAt: z.coerce.date({ invalid_type_error: 'A valid due date is required' }),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: objectIdSchema,
    taskId: objectIdSchema,
  }),
  body: z.object({
    completed: z.boolean(),
  }),
});

export const bulkLeadsSchema = z.object({
  body: z.object({
    leadIds: z.array(objectIdSchema).min(1, 'Select at least one lead').max(100, 'Too many leads selected'),
    action: z.enum(['status', 'bucket', 'delete', 'assign']),
    status: z.enum(LEAD_STATUSES).optional(),
    bucket: z.enum(LEAD_BUCKETS).optional(),
    assignedTo: objectIdSchema.nullable().optional(),
  }),
});

export const savedLeadFilterSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Filter name is required').max(80, 'Filter name is too long'),
    search: z.string().trim().max(120, 'Search is too long').optional().default(''),
    status: z.enum(['', ...LEAD_STATUSES]).optional().default(''),
    bucket: z.enum(LEAD_BUCKETS).optional().default('leads'),
    quickFilter: quickFilterSchema.optional().default(''),
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
    bucket: z.enum(['', ...LEAD_BUCKETS]).optional().default(''),
    quickFilter: quickFilterSchema.optional().default(''),
    assignedTo: z.union([objectIdSchema, z.literal('')]).optional().default(''),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  }),
});
