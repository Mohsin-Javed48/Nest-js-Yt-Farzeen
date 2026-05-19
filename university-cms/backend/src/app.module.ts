import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Recommended for process.env
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    // 1. Setup ConfigModule to read .env files
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. Setup Database Connection
    MongooseModule.forRoot(process.env.MONGO_URI!),
    // 3. Import your Feature Modules
    StudentModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
