import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';

import { AppController } from './app.controller';
import { RequestsLogMiddleware } from './common/middleware/requests-log-middleware';
import { ScheduleLonModule } from './schedule-lon/schedule-lon.module';

import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    ScheduleLonModule,
  ],
  controllers: [AppController],
  providers: [AppService], // { provide: APP_GUARD, useClass: AuthGuard }
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestsLogMiddleware).forRoutes('*');
  }
}
