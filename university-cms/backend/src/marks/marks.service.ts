import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mark } from './schemas/marks.schema';
import { Model } from 'mongoose';

@Injectable()
export class MarksService {
  constructor(@InjectModel(Mark.name) private marksModel: Model<Mark>) {}

  async createMark(markData: Partial<Mark>): Promise<Mark> {
    const createdMark = new this.marksModel(markData);
    return createdMark.save();
  }

  async getMarks(): Promise<Mark[]> {
    return this.marksModel.find().exec();
  }
  async updateMark(id: string, markData: Partial<Mark>): Promise<Mark> {
    const updated = await this.marksModel
      .findByIdAndUpdate(id, markData, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Mark with id ${id} not found`);
    }

    return updated;
  }
}
