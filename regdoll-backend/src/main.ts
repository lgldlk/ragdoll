import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { EnvSwaggerOptions } from './config/swagger.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ServeOptions } from './config/serveConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService);
  const swaggerOptions = configService.get<EnvSwaggerOptions>(
    'EnvSwaggerOptions',
  );
  // 访问频率限制
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 1000, // 限制15分钟内最多只能访问1000次
    }),
  );
  // web 漏洞
  app.use(helmet());
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
