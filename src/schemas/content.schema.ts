import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type ContentDocument = HydratedDocument<Content>;

@Schema({
  _id: false,
  versionKey: false,

})
export class Content {
  @Prop({
    type: Number, 
    required: true, 
    unique: true, 
    alias: 'id'
  })
  _id: number;
  
  @Prop()
  type: string;

  @Prop()
  title: string;

 
}

export const ContentSchema = SchemaFactory.createForClass(Content)