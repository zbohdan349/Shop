import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SubCategoryService {
  constructor(private prisma: PrismaService) { }
  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const properties: any = createSubCategoryDto.properties;

    if (!properties?.sizes || properties?.sizes.length == 0)
      throw new BadRequestException('The "sizes" characteristic is required');

    await this.prisma.category.findFirstOrThrow({
      where: { id: createSubCategoryDto.categoryId },
    });

    return this.prisma.subCategory.create({
      data: { ...createSubCategoryDto },
    });
  }

  async findAll() {
    return this.prisma.subCategory.findMany();
  }
  async findAllByCategory(categoryId: string) {
    await this.prisma.category.findFirstOrThrow({ where: { id: categoryId } });
    return this.prisma.subCategory.findMany({ where: { categoryId } });
  }

  async findOne(id: string) {
    return this.prisma.subCategory.findFirstOrThrow({ where: { id } });
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    updateSubCategoryDto.categoryId
      ? await this.prisma.category.findFirstOrThrow({
        where: { id: updateSubCategoryDto.categoryId },
      })
      : null;

    return this.prisma.subCategory.update({
      where: { id },
      data: { ...updateSubCategoryDto },
    });
  }

  remove(id: string) {
    return this.prisma.subCategory.delete({ where: { id } });
  }
}
