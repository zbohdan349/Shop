import { PickType } from '@nestjs/swagger';
import { CreateDiscountDto } from './create-discount.dto';

export class UpdateDiscountDto extends PickType(CreateDiscountDto, [
  'name',
  'startDate',
  'endDate',
  'value',
] as const) { }
