import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

 const main = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all common methods
    allowedHeaders: 'Content-Type, Accept', // Allow common headers
    credentials: true, // Allow credentials (optional)
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(process.env.PORT, 10) || 3000, () => {
    console.log(`Server started on http://localhost:${parseInt(process.env.PORT, 10) || 3000}/`)
  });
  
}

main();
