/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-04-30 15:04:15
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-15 08:56:03
 */
import { AtomDto } from './dto/atom.dto';
import { Atom } from '../../database/entitys/Atom.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseData } from 'src/interfaces/result.interface';

@Injectable()
export class AtomService {


  constructor(
    @InjectRepository(Atom)
    private readonly atomRepo: Repository<Atom>,
  ) { }

  async deleteAtom(id: number) {
    console.log(id);

    await this.atomRepo.delete({ id })
    return { code: "200", message: "删除成功" }
  }
  async addAtom(atom: AtomDto): Promise<ResponseData> {
    await this.atomRepo.insert(atom);
    return { code: '200', message: '插入成功' };
  }
  async updateAtom(atom: AtomDto) {
    await this.atomRepo.update(atom, {
      id: atom.id
    })
    return {
      code: '200',
      message: "更新成功"
    }
  }
  async findList(): Promise<ResponseData> {
    return {
      code: '200',
      message: '查找成功',
      data: await this.atomRepo.find({
        order: {
          ele_number: 'ASC',
        },
      }),
    };
  }
  async getAtomByEleNum(ele_number: number): Promise<ResponseData> {
    return {
      code: '200',
      message: '查找成功',
      data: (await this.atomRepo.find({
        where: {
          ele_number,
        },
      }))[0],
    };
  }
}
