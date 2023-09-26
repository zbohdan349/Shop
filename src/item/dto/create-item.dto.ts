import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmptyObject()
  @IsNotEmpty()
  properties: object;
  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  price: number;
  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  amount: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subCategoryId: string;
  @ApiProperty()
  @IsString()
  collectionId?: string;
}
