import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true, unique: true })
  courseCode!: string; // e.g., CS101, MATH201

  @Prop({ required: true })
  courseName!: string; // e.g., "Introduction to Programming"

  @Prop()
  description?: string;

  @Prop({ required: true, min: 1, max: 4 })
  credits!: number; // Credit hours

  @Prop({ type: [Types.ObjectId], ref: 'Student', default: [] })
  enrolledStudents!: Types.ObjectId[]; // Array of enrolled student IDs

  @Prop()
  schedule?: string; // e.g., "MWF 10:00-11:00"

  @Prop({ default: true })
  isActive!: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);