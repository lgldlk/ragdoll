import { User } from './../../database/entitys/User.entity';
/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-18 22:36:57
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-18 22:42:55
 */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)
  private readonly userRepo: Repository<User>,) {

  }

  async login(account: string, password: string) {
    return await this.userRepo.find({ where: { account, password } })
  }
}
