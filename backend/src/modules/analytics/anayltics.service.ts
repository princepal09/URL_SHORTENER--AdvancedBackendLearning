import { shortUrlType } from '../url/url.types.js';
import { IAnalyticsRepository } from './anayltics.interface.js';
import { Request } from 'express';

export class AnalyticsService {
  constructor(private analyticsRepo: IAnalyticsRepository) {}

  async recordClick(shortUrl:shortUrlType, requestMetaData: Request) {
    await this.analyticsRepo.createAnalytics({
        shortUrlId: shortUrl.id,
        clickedAt: new Date(),
        ipAddress: requestMetaData.ip,
        userAgent: requestMetaData.headers["user-agent"],
        referrer: requestMetaData.get("Referer")
        
    });
  }
}
