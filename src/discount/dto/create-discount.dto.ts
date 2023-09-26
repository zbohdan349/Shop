import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ required: false, type: Date })
  @IsDateString()
  @IsNotEmpty()
  startDate?: Date;
  @ApiProperty({ type: Date })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  value: number;
  @ApiProperty({ required: false })
  @IsArray()
  @IsNotEmpty()
  items?: string[];
}
