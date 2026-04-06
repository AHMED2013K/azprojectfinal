import { z } from 'zod';

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid identifier');

export const announcementSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3, 'Title is required').max(120, 'Title is too long'),
    body: z.string().trim().min(5, 'Body is required').max(2000, 'Announcement is too long'),
  }),
});

export const messageSchema = z.object({
  params: z.object({
    recipientId: objectIdSchema,
  }),
  body: z.object({
    body: z.string().trim().min(1, 'Message body is required').max(2000, 'Message is too long'),
  }),
});

export const trackingActionSchema = z.object({
  body: z.object({
    action: z.enum(['start', 'pause', 'resume', 'end']),
  }),
});
