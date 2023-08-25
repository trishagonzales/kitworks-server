import { z } from 'zod';
import { NodeEnv } from './ConfigProps';

export const EnvValidationSchema = z.object({
  // App
  NODE_ENV: z.union([
    z.literal(NodeEnv.Production),
    z.literal(NodeEnv.Development),
    z.literal(NodeEnv.Test),
  ]),
  HOST: z.string(),
  PORT: z.number(),

  // Auth
  SESSION_SECRET: z.string(),
  JWT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  // Database
  DATABASE_SCHEME: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.number(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string().optional(),
  DATABASE_NAME: z.string(),

  // Cache
  CACHE_SCHEME: z.string(),
  CACHE_HOST: z.string(),
  CACHE_PORT: z.number(),

  // File Storage
  CLOUDINARY_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  // Mail
  SENDGRID_API_KEY: z.string(),
});

export type EnvVariables = z.infer<typeof EnvValidationSchema>;
