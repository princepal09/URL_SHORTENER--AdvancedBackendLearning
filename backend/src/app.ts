import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { requestLogger } from './middlewares/request-logger.middleware.js';
import { env } from './config/env.config.js';
import cookieParser from 'cookie-parser';
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

export default app;
