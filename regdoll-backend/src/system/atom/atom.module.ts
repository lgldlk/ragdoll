/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-04-30 21:54:50
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-12 08:58:54
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atom } from 'src/database/entitys/Atom.entity';
import { AtomController } from './atom.controller';
import { AtomService } from './atom.service';

@Module({
  imports: [TypeOrmModule.forFeature([Atom])],
  controllers: [AtomController],
  providers: [AtomService],
})
export class AtomModule { }
