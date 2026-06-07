import { Student } from '@/student/model/student.model';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field({ nullable: true })
  courseCode?: string;

  @Field({ nullable: true })
  courseName?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  credits?: number;

  @Field({ nullable: true })
  schedule?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field()
  enrolledStudentIds!: Student[];
}
