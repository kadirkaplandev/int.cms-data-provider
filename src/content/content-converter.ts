import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from '../schemas/content.schema';
import * as Promise from 'bluebird';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ContentConverter {
    constructor(
        @InjectModel(Content.name)
        private contentModel: Model<Content>,
    ) { }

    async getMediaUrl(params: Array<any>) {
        try {
            await Promise.map(params, async (url: any) => {
                const mediaurl = await this.contentModel.find({
                    _id: url.contentId,
                    type: 'mediadetail_url',
                    isActive: true
                })
                    .select({
                        _id: 1,
                        title: 1,
                        type: 1,
                        fields: 1
                    })
                    .lean()
                    .exec();

                url.url = mediaurl[0]?.fields?.find((f: any) => f.key === "url")?.value?.text;
            });

            return params;
        } catch (error) {
            throw new HttpException(
                error?.message || 'Media URL fetch failed',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getMediaDub(params: Array<any>) {
        try {
            await Promise.map(params, async (dub: any) => {
                const dubbing = await this.contentModel.find({
                    _id: dub.contentId,
                    type: 'mediadetail_dubbing',
                    isActive: true
                })
                    .select({
                        _id: 1,
                        title: 1,
                        type: 1,
                        fields: 1
                    })
                    .lean()
                    .exec();

                dub.url = dubbing[0]?.fields?.find((f: any) => f.key === "url")?.value?.text;
            });

            return params;
        } catch (error) {
            throw new HttpException(
                error?.message || 'Media URL fetch failed',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

     async getMediaSub(params: Array<any>) {
        try {
            await Promise.map(params, async (sub: any) => {
                const subtitle = await this.contentModel.find({
                    _id: sub.contentId,
                    type: 'mediadetail_subtitle',
                    isActive: true
                })
                    .select({
                        _id: 1,
                        title: 1,
                        type: 1,
                        fields: 1
                    })
                    .lean()
                    .exec();

                sub.url = subtitle[0]?.fields?.find((f: any) => f.key === "url")?.value?.text;
            });

            return params;
        } catch (error) {
            throw new HttpException(
                error?.message || 'Media URL fetch failed',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}

