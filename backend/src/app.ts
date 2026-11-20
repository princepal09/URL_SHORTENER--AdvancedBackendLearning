import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { requestLogger } from './middlewares/request-logger.middleware.js';
import { env } from './config/env.config.js';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './middlewares/error.middleware.js';
import authRouter from './modules/auth/auth.route.js';

const app = express();

app.use(helmet());
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: env?.FRONTEND_URL,
  }),
);
app.use(cookieParser());

app.get('/health', (_req, res) => {
  return res.status(200).json({
    success: true,
    message: 'URL SHORTENER API IS WOKING FINE',
  });
});

app.use('/api/v1/auth', authRouter);

app.use(globalErrorHandler);
export default app;
