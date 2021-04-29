import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvSwaggerOptions } from './config/env/swagger.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ServeOptions } from './config/env/serveConfig';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const swaggerOptions = configService.get<EnvSwaggerOptions>(
    'EnvSwaggerOptions',
  );
  const serveOptions = configService.get<ServeOptions>('serveOptions');
  const options = new DocumentBuilder()
    .setTitle(swaggerOptions.title)
    .setDescription(swaggerOptions.desc)
    .setVersion(swaggerOptions.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerOptions.setupUrl, app, document);
  await app.listen(serveOptions.port);
}
bootstrap();
