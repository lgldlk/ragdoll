/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-12 08:56:44
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-17 09:06:42
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
    private readonly constituentAtomRepo: Repository<ConstituentAtoms>
  ) {

  }
  async getMoleculeById(id: any) {
    let molecule: any = (await this.moleculeRepo.find({ where: { id } }))[0];
    let atomDatas: any = (await this.constituentAtomRepo.query("select * from constituent_atoms WHERE moleculeId =?", [id]));
    for (let atom of atomDatas) {
      atom.atom = (await this.moleculeRepo.query("SELECT * from atom where id =?", [atom.atomId]))[0]
    }
    molecule.atomDatas = atomDatas;
    return { code: "200", data: molecule }
  }
  async updateMoleculeValence(molecule: Molecule) {
    await this.moleculeRepo.save(molecule);
    for (let tmp of molecule.atomDatas) {
      await this.constituentAtomRepo.update({ id: tmp.id }, { valence: tmp.valence })
    }
    return {
      code: "200",
      message: "更新成功"
    }
  }
  async deleteMolecule(id: any) {
    await this.constituentAtomRepo.delete({ molecule: id })
    await this.moleculeRepo.delete({ id })
    return {
      code: "200",
      message: "删除成功"
    }
  }
  async allMolecule() {

    const allMolecules = await this.moleculeRepo.find();
    for (let molecule of allMolecules) {
      molecule.atomDatas = await this.moleculeRepo.query("select c.*,a.en_name from constituent_atoms c,atom a where c.moleculeId=? and a.id = c.atomId", [molecule.id]);
    }
    return {
      code: "200", data: allMolecules
    };
  }




  async addMolecule(molecule: Molecule) {
    await this.constituentAtomRepo.save(molecule.atomDatas)
    await this.moleculeRepo.save(molecule)
    return { code: "200", message: "添加成功" }
  }
}
