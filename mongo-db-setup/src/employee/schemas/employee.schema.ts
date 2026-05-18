import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Profile } from './profile.schema';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop()
  name!: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Profile' })
  profile!: Types.ObjectId | Profile;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
