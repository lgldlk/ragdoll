import { SceneBackground } from './../../database/entitys/SceneBackground.entity';
/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-17 09:03:01
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-18 18:02:50
 */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SceneBackgroundService {
  constructor(@InjectRepository(SceneBackground)
  private readonly sceneBackgroundRepo: Repository<SceneBackground>) {
  }
  async allSceneBackground() {
    return {
      code: "200",
      data: await this.sceneBackgroundRepo.find()
    }
  }
}
