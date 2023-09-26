import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { PrismaService } from 'nestjs-prisma';
import { ItemsDto } from 'src/item/dto/items-list.dto';

@Injectable()
export class DiscountService {
  constructor(private prisma: PrismaService) { }

  async create(createDiscountDto: CreateDiscountDto) {
    const { name, startDate, endDate, value, items } = createDiscountDto;
    return this.prisma.discount.create({
      data: {
        name,
        startDate,
        endDate,
        value,
        items: {
          connect: items.map((item) => ({ id: item })),
        },
      },
      include: {
        items: true,
      },
    });
  }

  async findAll() {
    return this.prisma.discount.findMany();
  }

  async findOne(id: string) {
    return this.prisma.discount.findUniqueOrThrow({
      where: { id },
      include: {
        items: true,
      },
    });
  }

  //TODO: create utills for date validation
  async update(id: string, updateDiscountDto: UpdateDiscountDto) {
    const { name, startDate, endDate, value } = updateDiscountDto;
    return this.prisma.discount.update({
      where: { id },
      data: {
        name,
        startDate,
        endDate,
        value,
      },
    });
  }

  async removeItems(removeItemsDto: ItemsDto) {
    return this.prisma.discount.update({
      where: { id: removeItemsDto.parentId },
      data: {
        items: {
          disconnect: removeItemsDto.items.map((item) => ({ id: item })),
        },
      },
      include: {
        items: true,
      },
    });
  }

  async addItems(removeItemsDto: ItemsDto) {
    return this.prisma.discount.update({
      where: { id: removeItemsDto.parentId },
      data: {
        items: { connect: removeItemsDto.items.map((item) => ({ id: item })) },
      },
      include: {
        items: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.discount.delete({ where: { id } });
  }
}
