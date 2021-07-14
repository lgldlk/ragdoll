/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-12 08:56:28
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-13 14:58:34
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { ConstituentAtoms } from 'src/database/entitys/ConstituentAtoms.entity';
import { Molecule } from 'src/database/entitys/Molecule.entity';
import { MoleculeService } from './molecule.service';

@Controller("molecule")
export class MoleculeController {
  constructor(private readonly moleculeService: MoleculeService) {

  }
  @Post("addMolecule")
  addMolecule(@Body("molecule") molecule: Molecule) {
    this.moleculeService.addMolecule(molecule)
    return { code: '200', molecule };

  }

}
