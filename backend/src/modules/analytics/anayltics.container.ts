import { AnalyticsRepository } from './analytics.repository.js';
import { AnalyticsService } from './anayltics.service.js';

const analyticsRepository = new AnalyticsRepository();
const analyticsService = new AnalyticsService(analyticsRepository);

export { analyticsService };
