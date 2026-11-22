import express from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { createUrlSchema, updateUrlSchema } from './url.schema.js';
import { authMiddleware } from '../../middlewares/authentication.middleware.js';
import { UrlController } from './url.controller.js';

const router = express.Router();

const userController = new UrlController();

router.post('/', validate(createUrlSchema), authMiddleware, userController.createshortUrl);
router.get('/:shortCode', userController.redirectToOriginURL);
router.patch('/:shortCode', validate(updateUrlSchema), authMiddleware, userController.updateOriginalUrl)

export default router;
