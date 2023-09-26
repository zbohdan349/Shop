import { Injectable } from '@nestjs/common';
import { CollectionDto } from './dto/collection.dto';
import { PrismaService } from 'nestjs-prisma';
import { ItemsDto } from '../item/dto/items-list.dto';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) { }

  async create(collectionDto: CollectionDto) {
    return this.prisma.collection.create({
      data: collectionDto,
    });
  }

  async findAll() {
    return this.prisma.collection.findMany();
  }

  async findOne(id: string) {
    return this.prisma.collection.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, collectionDto: CollectionDto) {
    return this.prisma.collection.update({
      where: { id },
      data: collectionDto,
    });
  }

  async remove(id: string) {
    return this.prisma.collection.delete({ where: { id } });
  }

  async addItems(itemsDto: ItemsDto) {
    return this.prisma.collection.update({
      where: { id: itemsDto.parentId },
      data: {
        items: { connect: itemsDto.items.map((item) => ({ id: item })) },
      },
      include: {
        items: true,
      },
    });
  }

  async removeItems(itemsDto: ItemsDto) {
    return this.prisma.collection.update({
      where: { id: itemsDto.parentId },
      data: {
        items: { disconnect: itemsDto.items.map((item) => ({ id: item })) },
      },
      include: {
        items: true,
      },
    });
  }
}
