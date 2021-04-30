import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import swaggerConfig from './swagger.config';
import * as Joi from '@hapi/joi';
import { getDirAllFileNameArr } from '../utils/configHelper';
import serveConfig from './serve.config';
import jwtConfig from './jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [...getDirAllFileNameArr()],
      encoding: 'utf-8',
      load: [swaggerConfig, serveConfig, jwtConfig],
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

        SQL_TYPE: Joi.string().default('mysql'),
        SQL_HOST_DEV: Joi.string(),
        SQL_HOST_PRO: Joi.string(),
        SQL_PORT_DEV: Joi.string(),
        SQL_PORT_PRO: Joi.string(),
        SQL_NAME: Joi.string().default('regdoll'),
        SQL_USERNAME: Joi.string().default('root'),
        SQL_PASSWORD: Joi.string().default(''),
        SQL_SYNCHRONIZE: Joi.boolean().default(true),
        JWT_SECRET_KEY: Joi.string(),
        NODE_ENV: Joi.string()
          .valid('dev', 'pro', 'test')
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
