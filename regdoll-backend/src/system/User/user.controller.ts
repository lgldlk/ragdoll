/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-18 22:36:47
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-18 22:41:33
 */
import { UserService } from './user.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("login")
  async login(@Body("account") account: string, @Body("password") password: string) {
    return await this.userService.login(account, password);
  }
}
