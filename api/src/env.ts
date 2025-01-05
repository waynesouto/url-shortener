import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(['local', 'production']),
  DATABASE_URL: z.string().url().min(1),
  BASE_URL: z.string().url(),
  PORT: z.number({ coerce: true }).optional()
});

export const env = envSchema.parse(process.env);
