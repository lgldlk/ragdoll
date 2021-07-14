/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-12 08:56:44
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-13 14:55:43
 */
import { Molecule } from 'src/database/entitys/Molecule.entity';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConstituentAtoms } from 'src/database/entitys/ConstituentAtoms.entity';

@Injectable()
export class MoleculeService {

  constructor(@InjectRepository(Molecule)
  private readonly moleculeRepo: Repository<Molecule>,

    @InjectRepository(ConstituentAtoms)
    private readonly atomRepo: Repository<ConstituentAtoms>
  ) {

  }
  async addMolecule(molecule: Molecule) {
    await this.atomRepo.save(molecule.atomDatas)
    await this.moleculeRepo.save(molecule)
  }
}
