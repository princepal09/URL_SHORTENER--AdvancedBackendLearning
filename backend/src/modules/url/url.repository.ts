import { ShortURL } from '../../../generated/prisma/client.js';
import { prisma } from '../../lib/prisma.js';
import { IUrlRepository } from './url.interface.js';
import { UpdateUrlInputType, updateUrlSchema } from './url.schema.js';
import { createShortUrlType } from './url.types.js';

export class UrlRespository implements IUrlRepository {
  constructor() {}

  async createShortUrl(data: createShortUrlType): Promise<ShortURL> {
    return prisma.shortURL.create({
      data,
    });
  }

  async findShortUrlByShortCode(shortCode: string): Promise<ShortURL | null> {
    return prisma.shortURL.findUnique({
      where: {
        shortCode,
      },
    });
  }

  async updateShortUrl(shortCode: string, data: UpdateUrlInputType): Promise<ShortURL | null> {
    const updateShortUrls = await prisma.shortURL.update({
      where: {
        shortCode,
      },
      data: {
        originalUrl: data.updatedOriginalUrl,
      },
    });
    return updateShortUrls;
  }
}
