import { ChemicalReaction } from './../../database/entitys/ChemicalReaction.entity';
/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-20 14:56:49
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 21:26:00
 */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChemicalReactionService {
  async chemicalById(id: any) {
    return {
      code: "200", data: await this.chemicalReactionRepo.findOne({
        where: {
          id
        }
      })
    }
  }
  constructor(@InjectRepository(ChemicalReaction)
  private readonly chemicalReactionRepo: Repository<ChemicalReaction>,) {
  }
  async allChemicalReaction() {
    return { code: "200", data: await this.chemicalReactionRepo.find() }
  }
  async saveChemicalReaction(chemicalReaction) {
    await this.chemicalReactionRepo.save(chemicalReaction)
    return { code: "200" }
  }
  async allChemicalWithoutEditor() {
    return {
      code: "200", data: await this.chemicalReactionRepo.find({
        select: ["leftMolecule", "rightMolecule", "reactionType", "id", "reactionCondition"],
      })
    }
  }
  async deleteChemical(id) {
    return {
      code: "200",
      data: await this.chemicalReactionRepo.delete({ id }),
      message: "删除成功"
    }
  }
}
