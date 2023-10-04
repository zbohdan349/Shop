import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BasketService } from './basket.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Item, Role } from '@prisma/client';
import { Roles } from '../roles/roles.decorator';

@ApiTags('Basket')
@Controller('basket')
@ApiBearerAuth()
export class BasketController {
  constructor(private readonly basketService: BasketService) { }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Req() req) {
    return this.basketService.findOne(req.headers.user);
  }

  @Post('add')
  @Roles(Role.ADMIN, Role.USER)
  addItemsToBasket(@Req() req, @Body() items: string[]) {
    return this.basketService.addItemsToBasket(req.headers.user, items);
  }
  @Post('remove')
  @Roles(Role.ADMIN, Role.USER)
  removeItemsFromBasket(@Req() req, @Body() items: string[]) {
    return this.basketService.removeItemsFromBasket(req.headers.user, items);
  }
}
