import { CreateBookInput } from './create-book.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field()
  @IsString()
  @IsNotEmpty()
  _id!: string;
}
