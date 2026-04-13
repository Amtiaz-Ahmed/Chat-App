import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error'],
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const startedAt = Date.now();

    res.on('finish', () => {
      const responseTime = Date.now() - startedAt;
      console.log(
        `[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} - ${responseTime}ms`,
      );
    });

    next();
  });

  app.use(express.static(join(process.cwd(), 'public')));

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
