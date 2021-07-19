/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-04-18 22:36:37
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 20:54:03
 */
import * as serveStatic from 'serve-static';
import { DtoValidationPipe } from './pipe/DtoValidation.pipe';
import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { EnvSwaggerOptions } from './config/swagger.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ServeOptions } from './config/serve.config';
import * as csurf from 'csurf';
import { Logger, ValidationPipe } from '@nestjs/common';
import path = require('path');
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.enableCors();
  const configService = app.get(ConfigService);
  const swaggerOptions = configService.get<EnvSwaggerOptions>(
    'EnvSwaggerOptions',
  );
  const serveOptions = configService.get<ServeOptions>('serveOptions');
  // 设置所有 api 访问前缀
  app.setGlobalPrefix(serveOptions.apiPrefix);
  // 防止跨站请求伪造
  // 设置 csrf 保存 csrfToken
  // app.use(csurf());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // 访问频率限制

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 1000, // 限制15分钟内最多只能访问1000次0
    }),
  );
  // web 漏洞
  app.use(helmet());

  app.useGlobalPipes(new DtoValidationPipe());
  app.use('/public', serveStatic(path.join(__dirname, '../public'), {
    maxAge: '1d',
    extensions: ['jpg', 'jpeg', 'png', 'gif'],
  }));

  const options = new DocumentBuilder()
    .setTitle(swaggerOptions.title)
    .setDescription(swaggerOptions.desc)
    .setVersion(swaggerOptions.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerOptions.setupUrl, app, document);
  await app.listen(serveOptions.port);
  Logger.log(`http://localhost:${serveOptions.port}`, '服务启动成功');
  Logger.log(`http://localhost:${serveOptions.port}`, '服务启动成功');
}
bootstrap();
