import { ShortURL } from '../../../generated/prisma/client.js';
import { prisma } from '../../lib/prisma.js';
import { IUrlRepository } from './url.interface.js';
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
            shortCode
        }
      })
  }
 


}
