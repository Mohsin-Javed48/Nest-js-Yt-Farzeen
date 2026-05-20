import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { Mark } from './schemas/marks.schema';
import { MarksService } from './marks.service';

@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Post()
  async createMark(@Body() markData: Partial<Mark>): Promise<Mark> {
    return this.marksService.createMark(markData);
  }

  @Get()
  async getMarks(): Promise<Mark[]> {
    return this.marksService.getMarks();
  }

  @Get(':id')
  async getMarksByStudentId(@Param('id') id: string): Promise<Mark[]> {
    return this.marksService.getMarksByStudentId(id);
  }

  @Put(':id')
  async updateMark(
    @Param('id') id: string,
    @Body() markData: Partial<Mark>,
  ): Promise<Mark> {
    return this.marksService.updateMark(id, markData);
  }
}
