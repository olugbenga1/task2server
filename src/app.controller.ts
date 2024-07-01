import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/hello')
  async getClientInfo(
    @Query('visitor_name') name: string,
    request,
  ): Promise<any> {
    return this.appService.getClientInfo(name, request);
  }
}
