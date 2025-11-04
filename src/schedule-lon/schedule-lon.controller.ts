import { Controller, Post } from '@nestjs/common';
import { ScheduleLonService } from './schedule-lon.service';

@Controller('schedule-lon')
export class ScheduleLonController {
  constructor(private readonly scheduleLonService: ScheduleLonService) {}

  @Post()
  demo() {
    return this.scheduleLonService.handleSchdule();
  }
}
