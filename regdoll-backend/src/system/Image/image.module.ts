/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-13 08:26:27
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-13 08:27:58
 */
import { ImageService } from './image.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';

@Module({
  imports: [],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule { }
