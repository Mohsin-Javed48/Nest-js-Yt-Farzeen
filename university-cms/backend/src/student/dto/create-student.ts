import {
  IsInt,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Length,
  Matches,
} from 'class-validator';
export class CreateStudentDto {
  @IsInt()
  studentId!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  fatherName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @Length(13, 13)
  @Matches(/^[0-9]+$/)
  cnic!: string;

  @IsString()
  @Length(10, 15)
  phone!: string;

  @IsNumber()
  Cgpa!: number;
}
