import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Role } from '@prisma/client';
import { Roles } from './roles/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@ApiBearerAuth()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Roles(Role.ADMIN)
  getHello(@Req() req): string {
    return req?.user
    // return this.appService.getHello();
  }
}
