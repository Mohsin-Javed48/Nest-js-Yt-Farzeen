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

  async seed(): Promise<{dev1: Developer, dev2: Developer}> {
    const [project1, project2] = await Promise.all([
        this.projectModel.create({ title: 'Project A' }),
        this.projectModel.create({ title: 'Project B' }),
    ])

    const [dev1, dev2] =  await Promise.all([
        this.developerModel.create({
            name: 'Alice',
            projects: [project1._id, project2._id]
        }),
        this.developerModel.create({
            name: 'Bob',
            projects: [project1._id]
        })
    ])
      return {dev1, dev2}   

    }
  }

  async createProject() : Promise<Project> {
    const developer1 = await new this.developerModel({
        name: 'Alice',

    })
  }
}
