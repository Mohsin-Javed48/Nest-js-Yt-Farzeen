import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Course } from '../course/course.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  studentId!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  fatherName?: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ unique: true, type: 'varchar', length: 13 })
  cnic!: string;

  @Column({ unique: true, type: 'varchar', length: 15 })
  phone!: string;

  @Column({ type: 'float', nullable: true })
  cgpa?: number;

  @ManyToMany(() => Course, (course) => course.enrolledStudents)
  courses?: Course[];
}
