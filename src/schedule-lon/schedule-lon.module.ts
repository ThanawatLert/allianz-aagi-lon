import { Module } from '@nestjs/common';
import { ScheduleLonService } from './schedule-lon.service';
import { ScheduleLonController } from './schedule-lon.controller';

@Module({
  controllers: [ScheduleLonController],
  providers: [ScheduleLonService],
})
export class ScheduleLonModule {}
