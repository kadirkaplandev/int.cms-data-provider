import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from '../schemas/content.schema';
import { contentFilterDto, paginationDto } from './dto/content-filter.dto';

@Injectable()
export class ContentService {
  constructor(@InjectModel(Content.name) private contentModel: Model<Content>) { }



  async findAll(filter: contentFilterDto, pagination: paginationDto): Promise<Content[]> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    let query = {
      type: { $in: filter.type }
    };

    return await this.contentModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .select({
        _id: 1,
        title: 1,
        type: 1,
        fields: 1
      })
      .lean()
      .exec();


  }

  async findOne(id: string) {
    const content = await this.contentModel.
      findById(id)
      .select({ _id: 1, title: 1, type: 1, fields: 1 })
      .lean()
      .exec();

    if (!content) {
      throw new NotFoundException('Content not found');
    }
    return content;
  }

}
