import { prisma } from '../../lib/prisma.js';
import { User } from '../../../generated/prisma/client.js';
import { IAuthRepository } from './auth.interface.js';
import { RegisterUserType } from './auth.type.js';

export class AuthRepository implements IAuthRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(data: RegisterUserType): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
