/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-04-18 22:36:37
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-05 08:36:15
 */
import { AtomModule } from './system/atom/atom.module';
import { SystemModule } from './system/system.module';
import { AtomService } from './system/atom/atom.service';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerConfigModule } from './config/config.module';

@Module({
  imports: [SystemModule, DatabaseModule, SwaggerConfigModule, AtomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
