/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-12 08:44:30
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 14:37:24
 */
import { number } from '@hapi/joi';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Atom } from './Atom.entity';
import { Molecule } from './Molecule.entity';

@Entity('constituent_atoms')
export class ConstituentAtoms {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: "float", comment: "原子坐标x轴位置" })
  x: number
  @Column({ type: "float", comment: "原子坐标y轴位置" })
  y: number
  @Column({ type: "float", comment: "原子坐标z轴位置" })
  z: number
  @Column({ type: "int", comment: "化合价" })
  valence: number
  @ManyToOne(() => Molecule, molecule => molecule.atomDatas)
  molecule: Molecule;

  @ManyToOne(() => Atom, atom => atom.atomPositions)
  atom: Atom;
}