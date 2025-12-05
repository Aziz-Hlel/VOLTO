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
  const allowedOrigins = ENV.ALLOWED_ORIGIN_PATTERNS.split(',').map(
    (pattern) => new RegExp(pattern.trim()),
  );
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-total-count'],
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow curl/postman requests

      const allowed = allowedOrigins.some((regex) => regex.test(origin));
      if (allowed) return callback(null, true);

      callback(new Error('Not allowed by CORS'));
    },
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
