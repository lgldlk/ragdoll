/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-04-18 22:36:37
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-29 19:23:17
 */
import { Atom } from './database/entitys/Atom.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseData } from './interfaces/result.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ResponseData {
    return this.appService.getHello();
  }
}
