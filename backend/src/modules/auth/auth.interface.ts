import { User } from "../../../generated/prisma/client.js";
import { RegisterUserType } from "./auth.type.js";

export interface IAuthRepository {
  findUserById(id: string): Promise<User | null>;

  findUserByEmail(email: string): Promise<User | null>;

  createUser(data: RegisterUserType): Promise<User>;
}