import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }
  async create(createCategoryDto: CategoryDto) {
    return this.prisma.category.create({
      data: { name: createCategoryDto.name },
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: string) {
    return this.prisma.category.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, categoryDto: CategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: { name: categoryDto.name },
    });
  }

  async remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
