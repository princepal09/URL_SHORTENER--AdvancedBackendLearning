import { customAlphabet } from 'nanoid';
import { env } from '../../config/env.config.js';
import { AppError } from '../../utils/common/error/AppError.js';

const SHORTCODELENGTH = env?.URL_SHORTCODE_LENGTH || 8;

const createId = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  SHORTCODELENGTH,
);

const ALLOWEDPORTOCOLS = ['http', 'https'];

export const createShortCode = (): string => {
  return createId();
};

export const parseUrl = (originalUrl: string) => {
  try {
    const parsedUrl = new URL(originalUrl);

    if (!ALLOWEDPORTOCOLS.includes(parsedUrl.protocol)) {
      throw new AppError('Invalid URL protocol. Only http and https are allowed.', 400);
    }
    return parsedUrl.toString();
  } catch (error) {
    throw new AppError('Invalid URL format.', 400);
  }
};
