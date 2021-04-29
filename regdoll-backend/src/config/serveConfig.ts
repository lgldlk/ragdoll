import { registerAs } from '@nestjs/config';
export interface ServeOptions {
  port: string;
}
export default registerAs(
  'serveOptions',
  (): ServeOptions => ({
    port: process.env.SERVE_LISTENER_PORT, // swagger标题
  }),
);
