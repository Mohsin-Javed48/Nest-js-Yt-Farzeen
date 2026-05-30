import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Developer } from './developer.schema';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Developer' }] })
  developers!: Developer[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
