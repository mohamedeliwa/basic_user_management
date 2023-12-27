import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * finds a user by id
   * @returns user
   */
  async findUserById({
    id,
  }: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * creates a new user
   * @returns created user
   */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  /**
   * updates the user's password
   * @returns user
   */
  async changeUserPassword(
    { id }: Prisma.UserWhereUniqueInput,
    { password }: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: { password } });
  }
}
