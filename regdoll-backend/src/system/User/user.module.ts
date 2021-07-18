/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-18 22:36:38
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-18 22:39:57
 */
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entitys/User.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController,
  ],
  providers: [UserService,],
})
export class UserModule { }
