import { AtomModule } from './system/atom/atom.module';
import { SystemModule } from './system/system.module';
import { AtomService } from './system/atom/atom.service';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerConfigModule } from './config/config.module';

@Module({
  imports: [SystemModule, DatabaseModule, SwaggerConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
