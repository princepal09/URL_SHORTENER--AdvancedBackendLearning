import { logger } from '../../config/logger.js';
import { AppError } from '../../utils/common/error/AppError.js';
import { deleteCache, getCache, setCache } from './cache/cache.service.js';
import { createShortCode, getShortUrlCacheKey } from './url.helpers.js';
import { IUrlRepository } from './url.interface.js';
import { UpdateUrlInputType, UrlInputType } from './url.schema.js';

export class UrlService {
  constructor(private urlRepo: IUrlRepository) {}

  async createShortUrl(data: UrlInputType, userId: string) {
    const originalUrl = data.originalUrl;

    const MAX_RETRIES = 5;

    for (let i = 0; i < MAX_RETRIES; i++) {
      const shortCode = createShortCode();

      const existingShortUrl = await this.urlRepo.findShortUrlByShortCode(shortCode);

      if (!existingShortUrl) {
        const shortUrl = await this.urlRepo.createShortUrl({
          originalUrl,
          userId,
          shortCode,
        });
        return shortUrl;
      }
    }

    throw new AppError('Short code for this url already exists', 400);
  }

  async getOriginalUrlFromShortCode(shortCode: string) {
    const cachedShortUrl = await getCache(getShortUrlCacheKey(shortCode));

    if (cachedShortUrl) {
      const parsedCachedShortUrl = JSON.parse(cachedShortUrl);
      logger.info({ event: 'CACHE_HIT' }, shortCode);
      return parsedCachedShortUrl;
    }

    logger.info({
      event: 'CACHE_MISS',
      shortCode,
    });
    const shortUrl = await this.urlRepo.findShortUrlByShortCode(shortCode);

    if (!shortUrl) {
      throw new AppError('Short URL not found', 404);
    }

    await setCache(getShortUrlCacheKey(shortUrl.shortCode), JSON.stringify(shortUrl), 300);

    return shortUrl;
  }

  async updateShortUrl(userId: string, shortCode: string, data: UpdateUrlInputType) {
    const shortUrl = await this.urlRepo.findShortUrlByShortCode(shortCode);

    if (!shortUrl) {
      throw new AppError('Short URl not found', 404);
    }

    if (shortUrl?.userId !== userId) {
      throw new AppError('You are not allowed to perform this action', 403);
    }

    const updatedShortUrl = await this.urlRepo.updateShortUrl(shortCode, data);

    if (!updatedShortUrl) {
      throw new AppError('You are not allowed to perform this action', 403);
    }

    await deleteCache(getShortUrlCacheKey(shortCode));

    await setCache(
      getShortUrlCacheKey(updatedShortUrl.shortCode),
      JSON.stringify(shortUrl),
      300,
    );

    return updatedShortUrl;
  }
}
