import { z } from 'zod';

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid identifier');
const statusSchema = z.enum(['pending', 'approved', 'rejected']);

export const publicReviewSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Le nom est requis').max(120, 'Le nom est trop long'),
    content: z.string().trim().min(15, 'Votre avis est trop court').max(2000, 'Votre avis est trop long'),
    consent: z.literal(true, { errorMap: () => ({ message: 'Votre accord est requis' }) }),
  }),
});
export const reviewQuerySchema = z.object({ query: z.object({ status: z.union([statusSchema, z.literal('')]).optional().default('') }) });
export const reviewParamsSchema = z.object({ params: z.object({ id: objectIdSchema }) });
export const reviewUpdateSchema = z.object({ body: z.object({ status: statusSchema }) });
