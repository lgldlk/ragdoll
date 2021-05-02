import { Atom } from './../../database/entitys/Atom.entity';
import { AtomService } from './atom.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AtomDto } from './dto/atom.dto';
import { ResponseData } from 'src/interfaces/result.interface';
import { Query } from '@nestjs/common';

@ApiTags('角色管理')
@Controller('atom')
export class AtomController {
  constructor(private readonly atomService: AtomService) {}
  @Post('addAtom')
  async addAtom(@Body() atom: AtomDto): Promise<ResponseData> {
    return await this.atomService.addAtom(atom);
  }

  @Get('atomList')
  async getAtomList(): Promise<ResponseData> {
    return await this.atomService.findList();
  }
  @Get('getAtomById')
  async getAtomById(@Query() query): Promise<ResponseData> {
    return await this.atomService.getAtomByEleNum(query.ele_number);
  }
}
