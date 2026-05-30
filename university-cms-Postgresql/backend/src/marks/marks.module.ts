import { Module } from '@nestjs/common';
import { MarksController } from './marks.controller';
import { MarksService } from './marks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './mark.entity';
import { Course } from '../course/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mark, Course])],
  controllers: [MarksController],
  providers: [MarksService],
})
export class MarksModule {}
