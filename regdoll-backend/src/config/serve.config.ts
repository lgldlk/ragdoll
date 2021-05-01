import { registerAs } from '@nestjs/config';
export interface ServeOptions {
  port: string;
  apiPrefix: string;
}
export default registerAs(
  'serveOptions',
  (): ServeOptions => ({
    port: process.env.SERVE_LISTENER_PORT, // 开启端口
    apiPrefix: process.env.API_PREFIX,
  }),
);
