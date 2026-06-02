import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ensure JSON body parsing is available and add a simple logger for GraphQL requests
  app.use(express.json());
  app.use((req: any, res: any, next: any) => {
    if (req.path && req.path.includes('/graphql')) {
      console.log('--- GraphQL Request ---');
      console.log('method:', req.method);
      console.log('url:', req.url);
      console.log('headers:', req.headers);
      try {
        console.log('body:', JSON.stringify(req.body));
      } catch (err) {
        console.log('body: <unserializable>');
      }
      console.log('--- end ---');
    }
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
