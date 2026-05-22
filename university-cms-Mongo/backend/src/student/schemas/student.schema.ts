import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true, unique: true })
  studentId!: number; // Added ! here

  @Prop({ required: true })
  name!: string;

  @Prop()
  fatherName!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop()
  address!: string;

  @Prop({ required: true, unique: true })
  cnic!: number;

  @Prop({ required: true, unique: true, minlength: 8, maxlength: 14 })
  phone!: number;

  @Prop({ type: Number, min: 0, max: 4.0 })
  cgpa!: number;

  @Prop({ type: [Types.ObjectId], ref: 'Course', default: [] })
  courses!: Types.ObjectId[]; // Array of course IDs

  @Prop({ default: true })
  isActive!: boolean;
}
export type StudentDocument = Student & Document;

export const StudentSchema = SchemaFactory.createForClass(Student);
