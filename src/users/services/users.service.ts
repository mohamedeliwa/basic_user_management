import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  /**
   * finds a user by id
   * @returns user
   */
  async findUserByEmail({
    email,
  }: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  /**
   * creates a new user
   * @returns created user
   */
  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    /**
     * hashing the plaing text password before saving
     */
    user.password = await this.hashPassword(user.password);
    return this.prisma.user.create({
      data: user,
    });
  }

  /**
   * updates the user's profile
   * @returns user
   */
  async updateUser(
    { id }: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id },
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
    return this.prisma.user.update({
      where: { id },
      data: { password: await this.hashPassword(password.toString()) },
    });
  }

  /**
   * @param password plain text password
   * @returns hashed password
   */
  async hashPassword(password: string): Promise<string> {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(password, salt);
  }
}
