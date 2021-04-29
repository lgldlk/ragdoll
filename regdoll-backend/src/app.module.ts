import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerConfigModule } from './config/env/swaggerConfig.module';

@Module({
  imports: [SwaggerConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
