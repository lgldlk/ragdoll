import { ChemicalReactionService } from './chemicalreaction.service';
/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-20 14:56:26
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 21:23:54
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller("chemicalReaction")
export class ChemicalReactionController {
  constructor(private chemicalReactionService: ChemicalReactionService) { }
  @Get("allChemicalReaction")
  async allChemicalReaction() {
    return await this.chemicalReactionService.allChemicalReaction();
  }
  @Get("allChemicalWithoutEditor")
  async allChemicalWithoutEditor() {
    return await this.chemicalReactionService.allChemicalWithoutEditor();
  }
  @Post("chemicalById")
  async chemicalById(@Body() body) {
    return await this.chemicalReactionService.chemicalById(body.id);
  }
  @Post("saveChemical")
  async saveChemical(@Body("chemical") chemical) {
    return await this.chemicalReactionService.saveChemicalReaction(chemical)
  }
  @Post("deleteChemical")
  async deleteChemical(@Body() body) {
    return await this.chemicalReactionService.deleteChemical(body.id);
  }
}
