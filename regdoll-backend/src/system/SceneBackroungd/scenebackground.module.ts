import { SceneBackground } from './../../database/entitys/SceneBackground.entity';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SceneBackgroundController } from './scenebackground.controller';
import { SceneBackgroundService } from './scenebackground.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SceneBackground])],
  controllers: [SceneBackgroundController],
  providers: [SceneBackgroundService],
})
export class SceneBackgroundModule { }
