import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Course } from './Schemas/course.schema';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const createdCourse = new this.courseModel(courseData);
    return createdCourse.save();
  }

  async getCourses(): Promise<Course[]> {
    return this.courseModel.find().populate('enrolledStudents').exec();
  }
}
