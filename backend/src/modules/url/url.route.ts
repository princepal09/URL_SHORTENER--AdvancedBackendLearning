import express from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { createUrlSchema, updateUrlSchema } from './url.schema.js';
import { authMiddleware } from '../../middlewares/authentication.middleware.js';
import { UrlController } from './url.controller.js';
import { shortUrlRateLimit } from '../../middlewares/rate-limit/short-url-rate-limit.middleware.js';

const router = express.Router();

const userController = new UrlController();

router.post(
  '/',
  authMiddleware,
  shortUrlRateLimit,
  validate(createUrlSchema),
  userController.createshortUrl,
);
router.get('/:shortCode', userController.redirectToOriginURL);
router.patch(
  '/:shortCode',
  validate(updateUrlSchema),
  authMiddleware,
  userController.updateOriginalUrl,
);

export default router;
