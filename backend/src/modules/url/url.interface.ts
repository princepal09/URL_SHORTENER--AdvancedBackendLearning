import { ShortURL } from '../../../generated/prisma/client.js';
import { UpdateUrlInputType } from './url.schema.js';
import { createShortUrlType } from './url.types.js';

export interface IUrlRepository {
  findShortUrlByShortCode(shortCode: string): Promise<ShortURL | null>;
  createShortUrl(data: createShortUrlType): Promise<ShortURL>;
  updateShortUrl(shortCode:string, data:UpdateUrlInputType):Promise<ShortURL | null>;
}
[]