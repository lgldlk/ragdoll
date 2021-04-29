import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import swaggerConfig from './swagger.config';
import * as Joi from '@hapi/joi';
import { getDirAllFileNameArr } from '../utils/configHelper';
import serveConfig from './serveConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [...getDirAllFileNameArr()],
      encoding: 'utf-8',
      load: [swaggerConfig, serveConfig],
      isGlobal: true,
      expandVariables: true,
      ignoreEnvVars: true,
      validationSchema: Joi.object({
        SERVE_LISTENER_PORT: Joi.number().default(3000),
        SWAGGER_SETUP_PATH: Joi.string().default('api'),
        SWAGGER_UI_TITLE: Joi.string().default('布偶文档'),
        SWAGGER_UI_TITLE_DESC: Joi.string().default(
          '本文档包含布偶的接口及类型说明~~',
        ),
        SWAGGER_API_VERSION: Joi.string().default('1.0'),
        NODE_ENV: Joi.string()
          .valid('dev', 'production', 'test', 'provision')
          .default('dev'),
      }),
      validationOptions: {
        allowUnknown: true, // 控制是否允许环境变量中未知的键。默认为true。
        abortEarly: false, // 如果为true，在遇到第一个错误 时就停止验证；如果为false，返回所有错误。默认为false。
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class SwaggerConfigModule {}
