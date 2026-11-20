import { ErrorRequestHandler } from 'express';
import { ZodError, z } from 'zod';
import { env } from '../config/env.config.js';
import { logger } from '../config/logger.js';
import { AppError } from '../utils/common/error/AppError.js';

type ErrorResponse = {
  success: false;
  status: string;
  message: string;
  errors?: unknown;
  stack?: string;
};

const isJsonSyntaxError = (
  error: unknown,
): error is SyntaxError & { status?: number; body?: unknown } =>
  error instanceof SyntaxError &&
  'status' in error &&
  (error as { status?: number }).status === 400 &&
  'body' in error;

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong';
};

export const globalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  let statusCode = 500;
  let status = 'error';
  let message = getErrorMessage(error);
  let errors: unknown;
  let isOperational = false;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    status = error.status;
    isOperational = error.isOperational;
  } else if (error instanceof ZodError) {
    statusCode = 400;
    status = 'fail';
    message = 'Validation failed';
    errors = z.treeifyError(error);
    isOperational = true;
  } else if (isJsonSyntaxError(error)) {
    statusCode = 400;
    status = 'fail';
    message = 'Invalid JSON payload';
    isOperational = true;
  }

  if (!isOperational) {
    logger.error(error);
  }

  const response: ErrorResponse = {
    success: false,
    status,
    message,
  };

  if (errors !== undefined) {
    response.errors = errors;
  }

  if (env?.NODE_ENV === 'development' && error instanceof Error) {
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};
