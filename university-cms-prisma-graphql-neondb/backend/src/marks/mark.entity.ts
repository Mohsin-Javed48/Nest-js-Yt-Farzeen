import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../course/course.entity';

@Entity()
export class Mark {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  studentId!: string;

  @ManyToOne(() => Course, { eager: true, nullable: false })
  @JoinColumn({ name: 'courseId' })
  courseId!: Course;

  @Column({ type: 'int' })
  marksObtained!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column()
  grade!: string;
}
