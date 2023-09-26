import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';

const returnUser = {
  id: true,
  firstName: true,
  secondName: true,
  phone: true,
  email: true,
  role: true
}
//TODO: password encrypt
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        busket: {
          create: {},
        }
      },
    });
  }



  findAll() {
    return this.prisma.user.findMany({
      select: returnUser,
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
      select: returnUser,
    });
  }
}
