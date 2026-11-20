import { logger } from '../../config/logger.js';
import { AppError } from '../../utils/common/error/AppError.js';
import { hashPassword, signAccessToken, signRefreshToken } from './auth.helper.js';
import { IAuthRepository } from './auth.interface.js';
import { toUserResponse } from './auth.response.js';
import { LoginUserInputType, RegisterUserInputType } from './auth.schema.js';

export class AuthService {
  constructor(private authRepo: IAuthRepository) {}

  async registerUserService(data: RegisterUserInputType) {
    const existingUser = await this.authRepo.findUserByEmail(data.email);

    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    const hashedPassword = await hashPassword(data.password);

    if (!hashedPassword) {
      throw new AppError('Failed to hash password', 500);
    }

    const user = await this.authRepo.createUser({
      name: data.name,
      email: data.email,
      passwordHash: hashedPassword,
    });

    const accessToken = await signAccessToken({
      userId: user.id,
    });

    const refreshToken = await signRefreshToken({
      userId: user.id,
    });

    logger.info({
      event: 'User Registed',
      userId: user.id,
    });

    return {
      user: toUserResponse(user),
      accessToken,
      refreshToken,
    };
  }

  async loginUserService(data: LoginUserInputType) {
    const user = await this.authRepo.findUserByEmail(data.email);

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const verifiedPassword = await hashPassword(data.password);

    if (!verifiedPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    const accessToken = await signAccessToken({
      userId: user.id,
    });

    const refreshToken = await signRefreshToken({
      userId: user.id,
    });

    logger.info({
      event: 'User Logged In',
      userId: user.id,
    });

    return {
      user: toUserResponse(user),
      accessToken,
      refreshToken,
    };
  }

  async getLoggedInUserDetails(userId: string) {
    const user = await this.authRepo.findUserById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return toUserResponse(user);
  }
}
