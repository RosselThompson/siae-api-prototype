import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigModule } from './config/app/config.module';
import { AppConfigService } from './config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app
    .select(AppConfigModule)
    .get(AppConfigService, { strict: true });

  app.setGlobalPrefix(appConfig.prefix);

  const options = new DocumentBuilder()
    .setTitle('SIAE API')
    .setDescription('Contains the documentation for using the endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(appConfig.port);
}
bootstrap();
