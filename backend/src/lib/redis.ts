import { Redis } from 'ioredis';
import { env } from '../config/env.config.js';
import { logger } from '../config/logger.js';


export const redisConnection = {
  maxRetriesPerRequest: null,
};

export const redis = new Redis(env.REDIS_URL, redisConnection);

redis.on('connect', () => {
  logger.info('Redis connected successfully');
});

redis.on("ready", async () => {
  logger.info("Redis is ready.");
});

redis.on('error', (err) => {
  logger.error({
    status: false,
    message: 'Redis failed to connect',
    error: err,
  });
});

export default redis;
