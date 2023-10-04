import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BasketService {
  constructor(private prisma: PrismaService) { }

  async findOne(id: string) {
    return this.prisma.basket.findUniqueOrThrow({
      where: { userId: id },
    }).items();
  }

  async addItemsToBasket(basketId: string, items: string[]) {
    return this.prisma.basket.update({
      where: { userId: basketId },
      data: {
        items: {
          connect: items.map((item) => ({ id: item })),
        },
      },
    }).items();
  }

  async removeItemsFromBasket(basketId: string, items: string[]) {
    return this.prisma.basket.update({
      where: { userId: basketId },
      data: {
        items: {
          disconnect: items.map((item) => ({ id: item })),
        },
      },
    }).items();
  }
}
