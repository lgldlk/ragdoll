/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-04-18 22:36:37
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-29 15:35:16
 */
import { Injectable } from '@nestjs/common';
import { ResponseData } from './interfaces/result.interface';

@Injectable()
export class AppService {
  getHello(): ResponseData {
    return { code: '200', message: 'Hello World!' };
  }
}
