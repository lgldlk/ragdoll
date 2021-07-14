/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-12 08:56:21
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-13 08:27:33
 */
import { TypeOrmModule } from '@nestjs/typeorm';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Molecule } from 'src/database/entitys/Molecule.entity';
import { ConstituentAtoms } from 'src/database/entitys/ConstituentAtoms.entity';

import { MoleculeService } from './molecule.service';
import { MoleculeController } from './molecule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Molecule, ConstituentAtoms])],
  controllers: [MoleculeController],
  providers: [MoleculeService],
})
export class MoleculeModule { }
