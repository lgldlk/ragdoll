/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-04-30 21:55:38
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-05 08:24:50
 */
import { Atom } from './../../database/entitys/Atom.entity';
import { AtomService } from './atom.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AtomDto } from './dto/atom.dto';
import { ResponseData } from 'src/interfaces/result.interface';
import { Query } from '@nestjs/common';

@ApiTags('原子管理')
@Controller('atom')
export class AtomController {
  constructor(private readonly atomService: AtomService) { }

  @Post('addAtom')
  async addAtom(@Body() atom: AtomDto): Promise<ResponseData> {
    return await this.atomService.addAtom(atom);
  }

  @Get('atomList')
  async getAtomList(): Promise<ResponseData> {
    return await this.atomService.findList();
  }

  @Get('getAtomByEleNum')
  async getAtomById(@Query('ele_number') ele_number): Promise<ResponseData> {
    return await this.atomService.getAtomByEleNum(ele_number);
  }


}
