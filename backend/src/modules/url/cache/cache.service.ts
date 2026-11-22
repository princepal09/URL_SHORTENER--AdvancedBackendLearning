import redis from '../../../lib/redis.js';
import { logger } from '../../../config/logger.js';

export const setCache = async (key: string, value: string, ttl: number) => {
  try {
    await redis.set(key, value, 'EX', ttl);
  } catch (err) {
    logger.error({ message: 'Redis setCache failed', key, error: err });
  }
};

export const getCache = async (key: string) => {
  try {
    return await redis.get(key);
  } catch (err) {
    logger.error({ message: 'Redis getCache failed', key, error: err });
    return null;
  }
};

export const deleteCache = async (key: string) => {
  try {
    await redis.del(key);
  } catch (err) {
    logger.error({ message: 'Redis deleteCache failed', key, error: err });
  }
};
