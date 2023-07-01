import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigModule } from './config/app/config.module';
import { AppConfigService } from './config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app
    .select(AppConfigModule)
    .get(AppConfigService, { strict: true });
  // ADD SWAGGER
  await app.listen(appConfig.port);
}
bootstrap();
