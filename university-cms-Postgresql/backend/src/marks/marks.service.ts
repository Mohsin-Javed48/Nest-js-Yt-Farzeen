import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mark } from './mark.entity';
import { Course } from '../course/course.entity';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark)
    private readonly marksRepository: Repository<Mark>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async createMark(markData: Partial<Mark>): Promise<Mark> {
    const mark = await this.attachCourse(markData);
    const createdMark = this.marksRepository.create(mark);
    const savedMark = await this.marksRepository.save(createdMark);
    return this.getMarkByIdOrFail(savedMark.id);
  }

  async getMarks(): Promise<Mark[]> {
    return this.marksRepository.find({
      relations: { courseId: true },
    });
  }

  async getMarksByStudentId(studentId: string): Promise<Mark[]> {
    return this.marksRepository.find({
      where: { studentId },
      relations: { courseId: true },
    });
  }

  async updateMark(id: string, markData: Partial<Mark>): Promise<Mark> {
    const markId = Number(id);
    const existingMark = await this.getMarkByIdOrFail(markId);

    const mergedMark = await this.attachCourse({
      ...existingMark,
      ...markData,
    });

    await this.marksRepository.save(
      this.marksRepository.merge(existingMark, mergedMark),
    );

    return this.getMarkByIdOrFail(markId);
  }

  private async getMarkByIdOrFail(id: number): Promise<Mark> {
    const mark = await this.marksRepository.findOne({
      where: { id },
      relations: { courseId: true },
    });

    if (!mark) {
      throw new NotFoundException(`Mark with id ${id} not found`);
    }

    return mark;
  }

  private async attachCourse(markData: Partial<Mark>): Promise<Partial<Mark>> {
    const courseValue = markData.courseId;

    if (!courseValue || typeof courseValue === 'object') {
      return markData;
    }

    const courseId = Number(courseValue);
    if (Number.isNaN(courseId)) {
      throw new NotFoundException(`Course with id ${courseValue} not found`);
    }

    const course = await this.courseRepository.findOneBy({ id: courseId });

    if (!course) {
      throw new NotFoundException(`Course with id ${courseValue} not found`);
    }

    return { ...markData, courseId: course };
  }
}
