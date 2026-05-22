import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Mark extends Document {
  @Prop({ required: true })
  studentId!: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Course' })
  courseId!: Types.ObjectId;

  @Prop({ required: true, min: 0, max: 100 })
  marksObtained!: number;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ required: true })
  grade?: string; // Optional field for letter grade (e.g., A, B, C)
}

export const MarkSchema = SchemaFactory.createForClass(Mark);
