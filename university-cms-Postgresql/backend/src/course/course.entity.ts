import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Student } from '../student/student.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  courseCode!: string; // e.g., CS101, MATH201

  @Column()
  courseName!: string; // e.g., "Introduction to Programming"

  @Column()
  description?: string;

  @Column()
  credits!: number; // Credit hours

  @ManyToMany(() => Student, (student) => student.courses, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  enrolledStudents!: Student[];

  @Column()
  schedule?: string; // e.g., "MWF 10:00-11:00"

  @Column({ default: true })
  isActive!: boolean;
}
