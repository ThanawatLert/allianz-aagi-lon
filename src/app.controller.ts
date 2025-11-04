import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

// @ApiExcludeController(true)
@Controller({
  path: '',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getHelloWorld() {
    return this.appService.getHelloWorld();
  }

  @Get('/health-check')
  @HttpCode(HttpStatus.OK)
  getHealthCheck() {
    return this.appService.getHealthCheck();
  }

  // @Get('/admin')
  // @ApiBearerAuth(AuthApiType.SESSION_TOKEN)
  // @AuthApi([AuthApiType.SESSION_TOKEN])
  // adminInfo(@Req() request: CustomRequest) {
  //   return request.custom_attributes?.admin;
  // }

  // @Get('/page_config')
  // @ApiBearerAuth(AuthApiType.PAGE_TOKEN)
  // @AuthApi([AuthApiType.PAGE_TOKEN])
  // pageConfigInfo(@Req() request: CustomRequest) {
  //   return request.custom_attributes?.page_config;
  // }
}
