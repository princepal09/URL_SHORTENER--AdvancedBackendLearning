import { shortUrlType } from '../url/url.types.js';
import { RequestMetaDataType } from './analytics.types.js';
import { IAnalyticsRepository } from './anayltics.interface.js';

export class AnalyticsService {
  constructor(private analyticsRepo: IAnalyticsRepository) {}

  async recordClick(shortUrl: shortUrlType, requestMetaData: RequestMetaDataType) {
    await this.analyticsRepo.createAnalytics({
      shortUrlId: shortUrl.id,
      clickedAt: new Date(),
      ipAddress: requestMetaData.ipAddress,
      userAgent: requestMetaData.userAgent,
      referrer: requestMetaData.referrer,
    });
  }
}
