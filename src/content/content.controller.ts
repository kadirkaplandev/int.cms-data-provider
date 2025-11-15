import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContentService } from './content.service';
import { Content } from '../schemas/content.schema';
import { contentFilterDto, paginationDto } from './dto/content-filter.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) { }



  @Post()
  async findAll(
    @Body() filter: contentFilterDto,
    @Query() pagination: paginationDto
  ): Promise<Content[]> {
    return await this.contentService.findAll(filter, pagination);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.contentService.findOne(id);
  }

}
