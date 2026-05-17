import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Developer } from './schemas/developer.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Developer.name) private developerModel: Model<Developer>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async seed(): Promise<{ dev1: Developer; dev2: Developer }> {
    const [project1, project2] = await Promise.all([
      this.projectModel.create({ title: 'Project A' }),
      this.projectModel.create({ title: 'Project B' }),
    ]);

    const [dev1, dev2] = await Promise.all([
      this.developerModel.create({
        name: 'Alice',
        projects: [project1._id, project2._id],
      }),
      this.developerModel.create({
        name: 'Bob',
        projects: [project1._id],
      }),
    ]);
    await Promise.all([
      this.projectModel.findByIdAndUpdate(project1._id, {
        $push: { developers: dev1._id },
      }),
      this.projectModel.findByIdAndUpdate(project1._id, {
        $push: { developers: dev2._id },
      }),
      this.projectModel.findByIdAndUpdate(project2._id, {
        $push: { developers: dev1._id },
      }),
    ]);

    return { dev1, dev2 };
  }

  async getDevelopers(): Promise<Developer[]> {
    return this.developerModel.find().populate('projects').lean(); // .lean() returns plain JavaScript objects instead of Mongoose documents
  }

  async getProjects(): Promise<Project[]> {
    return this.projectModel.find().populate('developers').lean();
  }
}
