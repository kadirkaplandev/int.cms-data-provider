import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from '../schemas/content.schema';


@Injectable()
export class ContentService {
  constructor(@InjectModel(Content.name) private contentModel: Model<Content>) { }



  async findAll(): Promise<Content[]> {
    const contents = await this.contentModel
      .find({
        type: { $in: ['movie'] }
      })
      .select({
        _id: 1,
        title: 1,
        type: 1,
        fields: 1
      })
      .lean()
      .exec();
    return contents;
  }

  async findOne(id: string) {
    return await this.contentModel.
      findById(id)
      .select({ _id: 1, title: 1, type: 1, fields: 1 })
      .lean()
      .exec();
  }




}
