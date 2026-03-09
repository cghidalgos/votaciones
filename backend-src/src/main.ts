import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe, HttpStatus } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    }),
  );
  // serve frontend static files from public directory
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // for SPA, serve index.html on non-API routes
  app.use('*', (req, res, next) => {
    // only intercept GET requests that are not API calls
    // `originalUrl` preserves the full path including any global prefix
    const fullPath = req.originalUrl || req.url;
    if (req.method !== 'GET' || fullPath.startsWith('/api')) {
      return next();
    }
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  });

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
