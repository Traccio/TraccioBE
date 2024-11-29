import { Logger } from '@nestjs/common';
import { z } from 'zod';

const logger = new Logger('EnvLogger');

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'uat']),

  DATABASE_URL: z.string(),
  ID_TOKEN_SIGN_KEY: z.string(),
  ACCESS_TOKEN_SIGN_KEY: z.string(),
  REFRESH_TOKEN_SIGN_KEY: z.string()
});

export type Environment = z.infer<typeof envSchema>;
const envParsed = envSchema.safeParse(process.env);

if (envParsed.success === false) {
  logger.error(envParsed.error.issues);
  throw new Error('There is an error with the server environment variables');
}

logger.debug('Env initialized');
export const Env = envParsed.data;
