import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  healthz(): string {
    return 'The app is running properly!';
  }
}
