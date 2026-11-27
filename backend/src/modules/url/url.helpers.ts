import { customAlphabet } from 'nanoid';
import { env } from '../../config/env.config.js';
import { AppError } from '../../utils/common/error/AppError.js';

const SHORTCODELENGTH = env?.URL_SHORTCODE_LENGTH || 8;

const createId = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  SHORTCODELENGTH,
);

const ALLOWED_PROTOCOLS = ['http:', 'https:'];

export const createShortCode = (): string => {
  return createId();
};

export const parseUrl = (originalUrl: string): string => {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(originalUrl);
  } catch {
    throw new AppError('Invalid URL format.', 400);
  }

  if (!ALLOWED_PROTOCOLS.includes(parsedUrl.protocol)) {
    throw new AppError('Invalid URL protocol. Only http and https are allowed.', 400);
  }

  return parsedUrl.toString();
};

export const getShortUrlCacheKey = (shortCode: string) => {
  return `shortCode:${shortCode}`;
};
