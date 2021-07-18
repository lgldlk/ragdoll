import { SceneBackgroundService } from './scenebackground.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';

@Controller("sceneBackground")
export class SceneBackgroundController {
  constructor(private readonly sceneBackgroundService: SceneBackgroundService) { }
  @Get("allSceneBackground")
  async allSceneBackground() {
    return await this.sceneBackgroundService.allSceneBackground()
  }
}
