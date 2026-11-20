import { Request, Response } from 'express';

import { authService } from './auth.container.js';
import { catchAsync } from '../../utils/common/helpers/catchAsync.js';
import { setAuthCookies } from './auth.helper.js';
import { sendResponse } from '../../utils/response/AppResponse.js';

export class AuthController {
  registerUser = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.registerUserService(req.body);

    setAuthCookies(res, result.refreshToken);

    sendResponse(res, 201, {
      success: true,
      message: 'User registered successfully',
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  });

  loginUser = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await authService.loginUserService({ email, password });

    setAuthCookies(res, result.refreshToken);

    sendResponse(res, 200, {
      success: true,
      message: 'User logged in successfully',
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  });

  getLoggedInUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;

    const result = await authService.getLoggedInUserDetails(userId);

    sendResponse(res, 200, {
      success: true,
      message: 'User details feteched successfully',
      data: result,
    });
  });
}
