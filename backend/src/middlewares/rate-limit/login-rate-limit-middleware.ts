import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import redis from '../../lib/redis.js';
import { env } from '../../config/env.config.js';
import { logger } from '../../config/logger.js';

export const loginRateLimit = rateLimit({
  windowMs: Number(env.LOGIN_RATE_LIMIT_WINDOW_MS) * 60 * 1000,
  max: Number(env.LOGIN_RATE_LIMIT_SIZE),

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
    prefix: 'rate-limit:login:',
  }),

  handler: (req:Request, res: Response) => {
    logger.warn({
      event: 'LOGIN_RATE_LIMIT_EXCEEDED',
      ip: req.ip,
      path: req.originalUrl,
    });
    res.status(429).json({
      success: false,
      message: 'Too many login attempts, please try again later.',
    });
  },
});
