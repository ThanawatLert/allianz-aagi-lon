import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ScheduleLonService } from './schedule-lon/schedule-lon.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const myService = app.get(ScheduleLonService);
  await myService.handleSchdule();
  await app.close();
}
bootstrap();
