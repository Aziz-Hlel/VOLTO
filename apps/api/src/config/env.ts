// src/config/env.ts
import z from 'zod';

export const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'stage', 'production', 'test']),
    API_PORT: z.coerce.number(),

    API_URL: z.string(),
    WEB_URL: z.string(),
    ADMIN_URL: z.string(),
    ALLOWED_ORIGIN_PATTERNS: z.string(),

    JWT_ACCESS_SECRET: z.string(),
    JWT_REFRESH_SECRET: z.string(),

    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string(),
    DATABASE_URL: z.string(),

    AWS_REGION: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_S3_BUCKET: z.string(),
    AWS_CLOUDFRONT_URL: z.string(),

    MINIO_Region: z.string().optional(),
    MINIO_ROOT_USER: z.string().optional(),
    MINIO_ROOT_PASSWORD: z.string().optional(),
    MINIO_BUCKET: z.string().optional(),
    MINIO_ENDPOINT: z.string().optional(),
    MINIO_PORT: z.coerce.number().optional(),

    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number(),

    SMTP_HOST: z.string(),
    SMTP_PORT: z.string().transform((value) => parseInt(value)),
    SMTP_SECURE: z.string().transform((value) => value === 'true'),
    SMTP_USER: z.string(),
    SMTP_PASS: z.string(),

    ONE_SIGNAL_APP_SECRET: z.string().default(''),
    ONE_SIGNAL_APP_ID: z.string().default(''),

    IOS_MIN_SUPPORTED_VER: z.string().regex(/^\d+\.\d+\.\d+$/, {
      message: 'IOS_MIN_SUPPORTED_VER must be in the format x.y.z',
    }),
    ANDROID_MIN_SUPPORTED_VER: z.string().regex(/^\d+\.\d+\.\d+$/, {
      message: 'ANDROID_MIN_SUPPORTED_VER must be in the format x.y.z',
    }),
  })
  .refine(
    (data) => !['stage', 'production'].includes(data.NODE_ENV) || data.ONE_SIGNAL_APP_SECRET !== '',
    {
      path: ['ONE_SIGNAL_APP_SECRET'],
      message: 'ONE_SIGNAL_APP_SECRET is required in stage or production environments',
    },
  )
  .refine(
    (data) => !['stage', 'production'].includes(data.NODE_ENV) || data.ONE_SIGNAL_APP_ID !== '',
    {
      path: ['ONE_SIGNAL_APP_ID'],
      message: 'ONE_SIGNAL_APP_ID is required in stage or production environments',
    },
  )
  .refine(
    (data) => {
      try {
        new RegExp(data.ALLOWED_ORIGIN_PATTERNS);
        return true;
      } catch (_) {
        return false;
      }
    },
    { error: 'ALLOWED_ORIGIN_PATTERNS must be a valid regular expression' },
  );

const validatedEnv = envSchema.safeParse(process.env);
if (!validatedEnv.success) throw new Error(validatedEnv.error.message);

const ENV = validatedEnv.data;

export default ENV;
