import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config/app.config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Config.SERVER_PORT);
}
bootstrap();
