/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-12 08:56:28
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 11:52:13
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ConstituentAtoms } from 'src/database/entitys/ConstituentAtoms.entity';
import { Molecule } from 'src/database/entitys/Molecule.entity';
import { MoleculeService } from './molecule.service';

@Controller("molecule")
export class MoleculeController {
  constructor(private readonly moleculeService: MoleculeService) {

  }
  @Post("addMolecule")
  async addMolecule(@Body("molecule") molecule: Molecule) {
    // console.log(molecule);
    return await this.moleculeService.addMolecule(molecule)
  }
  @Get("allMolecule")
  async allMolecule() {
    return await this.moleculeService.allMolecule();
  }
  @Post("deleteMolecule")
  async deleteMolecule(@Body() body) {
    return await this.moleculeService.deleteMolecule(body.id);
  }
  @Post("updateMoleculeValence")
  async updateMoleculeValence(@Body("molecule") molecule: Molecule) {
    return await this.moleculeService.updateMoleculeValence(molecule)
  }
  @Get("getMoleculeById")
  async getMoleculeById(@Query() req) {
    return await this.moleculeService.getMoleculeById(req.id);
  }
  @Get("getMoleculeKnowById")
  async getMoleculeKnowById(@Query() req) {
    return await this.moleculeService.getMoleculeKnowById(req.id);
  }
  @Get("allMoleculeExp")
  async allMoleculeExp() {
    return await this.moleculeService.allMoleculeExp()
  }
  @Get("moleculeNameAndId")
  async moleculeNameAndId() {
    return await this.moleculeService.moleculeNameAndId();
  }
}
