import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from '../schemas/content.schema';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  

  @Get()
  async findAll(): Promise<Content[]> {
    return  await this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

}
