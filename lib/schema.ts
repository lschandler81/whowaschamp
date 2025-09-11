import { z } from 'zod';

/**
 * Zod schema for validating wrestling championship data
 */

export const reignSchema = z.object({
  champion: z.string().min(1, 'Champion name is required'),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format'),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in YYYY-MM-DD format').nullable(),
  title_key: z.string().optional(),
  title_name: z.string().optional(),
  source: z.string().optional(),
  revision: z.string().optional(),
  generated_at: z.string().optional(),
  won_event: z.string().optional(),
  won_location: z.string().optional(),
  notes: z.string().optional(),
}).refine((data) => {
  // If end_date exists, it should be after start_date
  if (data.end_date) {
    const start = new Date(data.start_date);
    const end = new Date(data.end_date);
    return end >= start;
  }
  return true;
}, {
  message: 'End date must be after start date',
  path: ['end_date'],
});

export const metadataSchema = z.object({
  generated_at: z.string(),
  source: z.string().optional(),
  revision: z.string().optional(),
  total_reigns: z.number().min(0),
  date_range: z.object({
    earliest: z.string(),
    latest: z.string().nullable(),
  }),
});

export const championshipSchema = z.object({
  metadata: metadataSchema,
  reigns: z.array(reignSchema).min(1, 'At least one reign is required'),
});

export type Reign = z.infer<typeof reignSchema>;
export type Championship = z.infer<typeof championshipSchema>;
export type Metadata = z.infer<typeof metadataSchema>;

/**
 * Validate and parse championship data with proper error handling
 */
export function parseChampionshipData(data: unknown): Championship {
  try {
    return championshipSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      throw new Error(`Championship data validation failed: ${errorMessages}`);
    }
    throw new Error('Invalid championship data format');
  }
}

/**
 * Type guards for runtime type checking
 */
export function isValidReign(obj: unknown): obj is Reign {
  try {
    reignSchema.parse(obj);
    return true;
  } catch {
    return false;
  }
}

export function isValidChampionship(obj: unknown): obj is Championship {
  try {
    championshipSchema.parse(obj);
    return true;
  } catch {
    return false;
  }
}