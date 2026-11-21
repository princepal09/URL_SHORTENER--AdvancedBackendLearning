import express from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { createUrlSchema } from './url.schema.js';
import { authMiddleware } from '../../middlewares/authentication.middleware.js';
import { UrlController } from './url.controller.js';

const router = express.Router();

const userController = new UrlController();

router.post('/', validate(createUrlSchema), authMiddleware, userController.createshortUrl);
router.get('/:shortCode', userController.redirectToOriginURL);

export default router;
