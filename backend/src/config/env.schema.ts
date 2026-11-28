import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.coerce.number(),
  FRONTEND_URL: z.url(),
  DATABASE_URL: z.string(),
  SALT_ROUNDS: z.coerce.number(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  URL_SHORTCODE_LENGTH: z.coerce.number(),
  REDIS_URL: z.string(),
  GLOBAL_RATE_LIMIT_WINDOW_MS: z.coerce.number(),
  GLOBAL_RATE_LIMIT_SIZE: z.coerce.number(),
  LOGIN_RATE_LIMIT_WINDOW_MS: z.coerce.number(),
  LOGIN_RATE_LIMIT_SIZE: z.coerce.number(),
  SHORT_URL_RATE_LIMIT_WINDOW_MS: z.coerce.number(),
  SHORT_URL_RATE_LIMIT_SIZE: z.coerce.number(),
  SHORT_URL_TOKEN_BUCKET_CAPACITY:z.coerce.number(),
  SHORT_URL_TOKEN_REFILL_RATE:z.coerce.number(),
  SHORT_URL_TOKEN_REFILL_INTERVAL:z.coerce.number(),
});

export type Env = z.infer<typeof envSchema>;
