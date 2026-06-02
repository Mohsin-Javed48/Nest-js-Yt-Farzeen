import {
  IsInt,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Length,
  Matches,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStudentDto {
  @Type(() => Number)
  @IsInt()
  studentId!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  fatherName?: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @Length(13, 13)
  @Matches(/^[0-9]+$/)
  cnic!: string;

  @IsString()
  @Length(10, 15)
  phone!: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  cgpa!: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  courses!: string[]; // Array of course IDs

  @IsOptional()
  @IsBoolean()
  isActive!: boolean;
}
