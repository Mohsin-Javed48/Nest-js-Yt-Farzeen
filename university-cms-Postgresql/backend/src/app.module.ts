import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Recommended for process.env
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { MarksModule } from './marks/marks.module';

@Module({
  imports: [
    // 1. Setup ConfigModule to read .env files
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        resolve(process.cwd(), '..', '.env'),
        resolve(process.cwd(), '.env'),
      ],
    }),
    // 2. Setup PostgreSQL connection for TypeORM entities
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.SUPABASE_URI ?? process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      ssl: { rejectUnauthorized: false },
    }),
    // 3. Import your Feature Modules
    StudentModule,
    CourseModule,
    MarksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
