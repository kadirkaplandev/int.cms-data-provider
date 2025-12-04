import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from '../schemas/content.schema';
import { contentFilterDto, paginationDto } from './dto/content-filter.dto';
import * as Promise from 'bluebird';
import { find } from 'rxjs';
import { ContentConverter } from "./content-converter"
@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<Content>,
    private readonly converter: ContentConverter
  ) { }



  async findAll(filter: contentFilterDto, pagination: paginationDto): Promise<Content[]> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    let query = {
      type: { $in: filter.type },
      isActive: true

    };
    if (filter.type.length === 0) {
      throw new NotFoundException('Content type must be selected.')
    }
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
      findOne({ _id: id, isActive: true })
      .select({ _id: 1, title: 1, type: 1, fields: 1 })
      .lean()
      .exec();

    switch (content?.type) {
      case 'series':
        return await this.contentModel.findOne({ _id: content._id, isActive: true }).select({
          _id: 1,
          title: 1,
          type: 1,
          fields: 1
        }).lean().exec();

        break;
      case 'movie':
        const singleVideos = await this.contentModel.find({
          "fields.value.contentId": content._id,
          type: 'single-video',
          isActive: true
        }).select({
          _id: 1,
          title: 1,
          type: 1,
          fields: 1
        }).lean().exec();

        content.singleVideos = []
        await Promise.map(singleVideos, async (sv: Content) => {


          let media = await sv.fields.find(f => f.key === 'mediadetail');


          const svEntry: any = { _id: sv._id, type: sv.type, title: sv.title, media: [] };
          if (media) {
            svEntry.media.push(media);
          }
          content.singleVideos.push(svEntry);
          if (media) {
            const mediaDetail = await this.contentModel.findOne({ _id: media.value.contentId, type: 'mediadetail', isActive: true }).lean().exec();
            if (mediaDetail) {
              const mediaDetailUrl = mediaDetail.fields.find((f: any) => f.key === "mediadetail_url")?.value ?? [];
              const mediaDetailDub = mediaDetail.fields.find((f: any) => f.key === "mediadetail_dubbing")?.value ?? [];
              const mediaDetailSub = mediaDetail.fields.find((f: any) => f.key === "mediadetail_subtitle")?.value ?? [];



              await Promise.all([
                this.converter.getMediaUrl(mediaDetailUrl),
                this.converter.getMediaDub(mediaDetailDub),
                this.converter.getMediaSub(mediaDetailSub)
              ]);


              svEntry.media.push(...mediaDetail.fields)

            }
          }
        })
        const { fields, ...cleanContent } = content
        return cleanContent;
        break;

      default:
        break;
    }


    if (!content) {
      throw new NotFoundException('Content not found');
    }
    return content;
  }

}
