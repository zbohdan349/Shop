import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ItemsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  parentId: string;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  items: string[];
}
