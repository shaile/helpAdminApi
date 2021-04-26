import { NestFactory } from '@nestjs/core';
import express = require('express');
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads'))); 
  await app.listen(process.env.PORT || 3009);
}
bootstrap();
