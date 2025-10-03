import { NestFactory } from '@nestjs/core';
import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import ENV from './config/env';

const globalPrefix = 'api';

const gloabalValidationPipe = new ValidationPipe({
  whitelist: true, // strips unknown properties
  forbidNonWhitelisted: true, // throws if extra fields are passed
  transform: true, // transforms payloads to DTO classes
});

function enableCors(app: INestApplication<any>) {
  const allowedOrigins = [ENV.ADMIN_URL, ENV.WEB_URL];

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-total-count'],
    allowedOrigins,
    credentials: true, // if you need cookies/authorization headers
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);

  const PORT = ENV.API_PORT;

  app.useGlobalPipes(gloabalValidationPipe);

  app.setGlobalPrefix(globalPrefix);

  enableCors(app);

  await app.listen(PORT);

  console.log(`Server running on http://localhost:${PORT}/${globalPrefix}/`);
}

bootstrap();
