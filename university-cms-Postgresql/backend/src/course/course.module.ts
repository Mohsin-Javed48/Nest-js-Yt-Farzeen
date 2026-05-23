import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../student/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Student])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
