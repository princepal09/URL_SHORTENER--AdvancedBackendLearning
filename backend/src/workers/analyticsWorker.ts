import { Worker } from 'bullmq';
import { logger } from '../config/logger.js';
import { deadLetterQueue } from '../queues/deadLetterQueue.js';
import { redisConnection } from '../lib/redis.js';
import { analyticsService } from '../modules/analytics/anayltics.container.js';

new Worker(
  'analyticsQueue',
  async (job) => {
    try {
      if (job.name === 'record-analytics')
        console.log({
          jobName: job.name,
          jobId: job.id,
          jobData: job.data,
        });

      await analyticsService.recordClick(job.data.shortUrl, {
        ipAddress: job.data.ipAddress,
        userAgent: job.data.userAgent,
        referrer: job.data.referrer,
      });
    } catch (error) {
      logger.error({
        message: `Job ${job.id} has failed`,
      });

      await deadLetterQueue.add('failed-analytics', {
        jobName: job.name,
        jobData: job.data,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      throw error;
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,
    limiter: {
      max: 10,
      duration: 1000,
    },
  },
);
