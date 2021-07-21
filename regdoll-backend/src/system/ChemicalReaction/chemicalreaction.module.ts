import { ChemicalReaction } from './../../database/entitys/ChemicalReaction.entity';
/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-20 14:51:47
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 14:58:23
 */
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ChemicalReactionController } from './chemicalreaction.controller';
import { ChemicalReactionService } from './chemicalreaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ChemicalReaction])],
  controllers: [
    ChemicalReactionController,
  ],
  providers: [
    ChemicalReactionService,
  ],
})
export class ChemicalReactionModule { }
