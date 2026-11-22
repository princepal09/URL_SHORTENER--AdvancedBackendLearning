import { Redis } from 'ioredis';
import { env } from '../config/env.config.js';
import { logger } from '../config/logger.js';

const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

redis.on('connect', () => {
  logger.info('Redis connected successfully');
});

redis.on('error', (err) => {
  logger.error({
    status: false,
    message: 'Redis failed to connect',
    error: err,
  });
});

export default redis;
