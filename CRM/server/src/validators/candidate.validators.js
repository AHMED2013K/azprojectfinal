import { z } from 'zod';

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid identifier');
const emailSchema = z.string().email('A valid email is required').transform((value) => value.toLowerCase());
const languageLevelSchema = z.enum(['basic', 'intermediate', 'advanced', 'fluent']);
const workModeSchema = z.enum(['montplaisir-flex', 'remote-only']);

function optionalBoundedInt({ min, max, message }) {
  return z.union([z.string(), z.number(), z.undefined()])
    .transform((value) => {
      if (value === undefined || value === null || value === '') {
        return null;
      }
      const nextValue = Number(value);
      if (!Number.isInteger(nextValue)) {
        return Number.NaN;
      }
      return nextValue;
    })
    .refine((value) => value === null || (Number.isInteger(value) && value >= min && value <= max), message);
}

export const publicCandidateApplicationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Le nom complet est requis').max(120, 'Le nom est trop long'),
    email: emailSchema,
    phone: z.string().trim().min(6, 'Le numero de telephone est requis').max(30, 'Le numero de telephone est trop long'),
    experienceYears: optionalBoundedInt({
      min: 0,
      max: 50,
      message: "Le nombre d'annees d'experience doit etre compris entre 0 et 50",
    }).transform((value) => value ?? 0),
    experienceMonths: optionalBoundedInt({
      min: 0,
      max: 11,
      message: "Le nombre de mois d'experience doit etre compris entre 0 et 11",
    }).transform((value) => value ?? 0),
    studyField: z.string().trim().min(2, "Le domaine d'etude est requis").max(120, "Le domaine d'etude est trop long"),
    frenchLevel: languageLevelSchema,
    englishLevel: languageLevelSchema,
    otherLanguage: z.string().trim().max(60, 'La langue supplementaire est trop longue').optional().default(''),
    otherLanguageLevel: z.union([languageLevelSchema, z.literal('')]).optional().default(''),
    summerInternshipAvailable: z.enum(['yes', 'no']),
    summerInternshipMonths: optionalBoundedInt({
      min: 1,
      max: 6,
      message: 'La duree du stage doit etre comprise entre 1 et 6 mois',
    }),
    hoursPerDayAvailable: optionalBoundedInt({
      min: 1,
      max: 24,
      message: 'Le nombre d heures disponibles par jour doit etre compris entre 1 et 24',
    }).refine((value) => value !== null, 'Le nombre d heures disponibles par jour est requis'),
    workMode: workModeSchema,
  }).superRefine((value, context) => {
    if (value.otherLanguage && !value.otherLanguageLevel) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['otherLanguageLevel'],
        message: 'Selectionnez aussi le niveau de la langue supplementaire',
      });
    }

    if (!value.otherLanguage && value.otherLanguageLevel) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['otherLanguage'],
        message: 'Indiquez le nom de la langue supplementaire',
      });
    }

    if (value.summerInternshipAvailable === 'yes' && value.summerInternshipMonths === null) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['summerInternshipMonths'],
        message: 'Precisez la duree du stage souhaitee',
      });
    }

    if (value.summerInternshipAvailable === 'no' && value.summerInternshipMonths !== null) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['summerInternshipMonths'],
        message: 'Laissez ce champ vide si vous n etes pas disponible pour un stage cet ete',
      });
    }
  }),
});

export const candidateQuerySchema = z.object({
  query: z.object({
    search: z.string().trim().optional().default(''),
    workMode: z.union([workModeSchema, z.literal('')]).optional().default(''),
    internship: z.union([z.enum(['yes', 'no']), z.literal('')]).optional().default(''),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(50).optional().default(20),
  }),
});

export const candidateParamsSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
