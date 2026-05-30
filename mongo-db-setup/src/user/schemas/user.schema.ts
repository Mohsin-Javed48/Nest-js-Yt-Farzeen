import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.schema';

export class User extends Document {
  @Prop()
  name!: string;

  @Prop({ type: Address })
  address!: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
