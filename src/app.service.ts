import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelloWorld() {
    return 'Hello World!';
  }

  getHealthCheck(): string {
    return 'I am alive';
  }
}
