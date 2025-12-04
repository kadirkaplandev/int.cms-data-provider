import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { Content } from '../schemas/content.schema';
import { contentFilterDto, paginationDto } from './dto/content-filter.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) { }


  //@UseGuards(JwtAuthGuard)
  @Post()
  async findAll(
    @Body() filter: contentFilterDto,
    @Query() pagination: paginationDto
  ): Promise<Content[]> {
    return await this.contentService.findAll(filter, pagination);
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.contentService.findOne(id);
  }

}
