import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentConverter } from './content-converter';
import { ContentController } from './content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from '../schemas/content.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }])
  ],
  controllers: [ContentController],
  providers: [ContentService,ContentConverter],
})
export class ContentModule { } 
