import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ItemModule } from './item/item.module';
import { CollectionModule } from './collection/collection.module';
import { DiscountModule } from './discount/discount.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    CategoryModule,
    SubCategoryModule,
    ItemModule,
    CollectionModule,
    DiscountModule,
    UserModule,
    AuthModule,
    BasketModule,
  ],
  controllers: [AppController],
  providers: [
    providePrismaClientExceptionFilter({
      // Prisma Error Code: HTTP Status Response
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2018: HttpStatus.NOT_FOUND,
      P2025: HttpStatus.NOT_FOUND,
    }),
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
  ],
})
export class AppModule { }
