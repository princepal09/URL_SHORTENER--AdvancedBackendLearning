import express from 'express';
import { AuthController } from './auth.controller.js';
import { loginUserSchema, registerUserSchema } from './auth.schema.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { authMiddleware } from '../../middlewares/authentication.middleware.js';
import { loginRateLimit } from '../../middlewares/rate-limit/login-rate-limit-middleware.js';

const router = express.Router();
const authController = new AuthController();

router.post('/register', validate(registerUserSchema), authController.registerUser);
router.post('/login', loginRateLimit, validate(loginUserSchema), authController.loginUser);
router.get('/me', authMiddleware, authController.getLoggedInUser);

export default router;
