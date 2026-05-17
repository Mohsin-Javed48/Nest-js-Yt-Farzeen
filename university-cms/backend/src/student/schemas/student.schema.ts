import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  cnic!: string;

  @Prop()
  phone!: string;

  @Prop({ type: Number, min: 0, max: 4.0 })
  Cgpa!: number;
}
export type StudentDocument = Student & Document;

export const StudentSchema = SchemaFactory.createForClass(Student);
