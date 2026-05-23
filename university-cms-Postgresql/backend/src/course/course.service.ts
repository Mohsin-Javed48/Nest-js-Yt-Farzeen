import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../student/student.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const createdCourse = this.courseRepository.create(courseData);
    return this.courseRepository.save(createdCourse);
  }

  async getCourses(): Promise<any[]> {
    return this.courseRepository.find({ relations: ['enrolledStudents'] });
  }

  async enrollStudent(courseId: string, studentId: string): Promise<any> {
    const course = await this.courseRepository.findOne({
      where: { id: Number(courseId) },
      relations: ['enrolledStudents'],
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const student = await this.studentRepository.findOneBy({
      id: Number(studentId),
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const existing = course.enrolledStudents ?? [];
    if (!existing.find((s) => s.id === student.id)) {
      course.enrolledStudents = [...existing, student];
      await this.courseRepository.save(course);
    }

    return this.courseRepository.findOne({
      where: { id: course.id },
      relations: ['enrolledStudents'],
    });
  }
}
