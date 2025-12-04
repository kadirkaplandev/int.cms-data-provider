import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type ContentDocument = HydratedDocument<Content>;

@Schema({
  _id: false,
  versionKey: false,

})
export class Content {
  @Prop({
    type: Number
  })
  _id: number;

  @Prop()
  type: string;

  @Prop()
  title: string;

  @Prop({ type: Array })
  fields: Array<any>;

  @Prop({ type: Array, default: [] })
  media: Array<any>;
  
  @Prop({ type: Array, default: [] })
  singleVideos: Array<any>

   @Prop({ type: Array, default: [] })
  episode: Array<any>

}

export const ContentSchema = SchemaFactory.createForClass(Content)