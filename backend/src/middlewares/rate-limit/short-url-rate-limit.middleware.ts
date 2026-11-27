import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import redis from '../../lib/redis.js';
import { Response, Request } from 'express';
import { env } from '../../config/env.config.js';
import { logger } from '../../config/logger.js';

export const shortUrlRateLimit = rateLimit({
  windowMs: Number(env.SHORT_URL_RATE_LIMIT_WINDOW_MS) * 60 * 1000,
  max: Number(env.SHORT_URL_RATE_LIMIT_SIZE),

  standardHeaders: true,
  legacyHeaders: false,

  store: new RedisStore({
    sendCommand: (...args: string[]) => {
      const [command, ...rest] = args;
      if (!command) {
        return Promise.reject(new Error('Missing Redis command'));
      }
      return redis.call(command, ...rest) as Promise<any>;
    },
    prefix: 'rate-limit:short-url:',
  }),

  handler: (req: Request, res: Response) => {
    logger.warn({
      event: 'SHORT_URL_RATE_LIMIT_EXCEEDED',
      ip: req.ip,
      path: req.originalUrl,
    });
    res.status(429).json({
      success: false,
      message: 'Too many short URLs created, please try again later.',
    });
  },

  keyGenerator: (req: Request) => {
    return req.user?.userId as string;
  },
});
