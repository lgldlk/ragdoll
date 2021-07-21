/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-04-30 14:27:14
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 14:40:52
 */
import { User } from './User.entity';
import { SceneBackground } from './SceneBackground.entity';
import { Atom } from './Atom.entity';
import { ConstituentAtoms } from './ConstituentAtoms.entity';
import { Molecule } from './Molecule.entity';
import { UserBelong } from './UserBelong.entity';
import { ChemicalReaction } from './ChemicalReaction.entity';
export default [Atom, Molecule, ConstituentAtoms, ChemicalReaction, SceneBackground, User, UserBelong];
