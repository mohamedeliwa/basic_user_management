import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async healthz(): Promise<string> {
    try {
      await this.prisma.$queryRaw`SELECT 1;`;
      return 'The app is running properly!';
    } catch (error) {
      throw new InternalServerErrorException("Can't connect to the database!");
    }
  }
}
