import { registerAs } from '@nestjs/config';
export interface EnvSwaggerOptions {
  title: string;
  setupUrl: string;
  desc?: string;
  version: string;
}
export default registerAs(
  'EnvSwaggerOptions',
  (): EnvSwaggerOptions => ({
    title: process.env.SWAGGER_UI_TITLE, // swagger标题
    desc: process.env.SWAGGER_UI_TITLE_DESC, // swagger描述
    version: process.env.SWAGGER_API_VERSION, // swagger api 版本,自定义的
    setupUrl: process.env.SWAGGER_SETUP_PATH, // UI文档路径
  }),
);
