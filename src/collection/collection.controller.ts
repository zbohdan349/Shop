import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionDto } from './dto/collection.dto';
import { ApiTags } from '@nestjs/swagger';
import { ItemsDto } from '../item/dto/items-list.dto';

@ApiTags('Collection')
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) { }

  @Post()
  create(@Body() createCollectionDto: CollectionDto) {
    return this.collectionService.create(createCollectionDto);
  }

  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionDto: CollectionDto) {
    return this.collectionService.update(id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(id);
  }

  @Post('/addItems')
  addItems(@Body() addItemsDto: ItemsDto) {
    return this.collectionService.addItems(addItemsDto);
  }

  @Post('/removeItems')
  removeItems(@Body() removeItemsDto: ItemsDto) {
    return this.collectionService.removeItems(removeItemsDto);
  }
}
