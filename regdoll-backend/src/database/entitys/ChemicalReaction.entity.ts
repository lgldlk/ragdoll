/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-20 14:36:42
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 19:59:03
 */

import { number } from '@hapi/joi';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity('chemical_reaction')
export class ChemicalReaction {
  @PrimaryGeneratedColumn()
  id: number
  @Column("simple-array")
  leftMolecule: number[];
  @Column("simple-array")
  rightMolecule: number[]
  @Column({ type: "varchar", comment: "反应类型" })
  reactionType: string
  @Column({ type: "longtext", comment: "反应内容" })
  reactionContent: string
  @Column({ type: "longtext", comment: "反应现象" })
  reactionPhenomena: string
  @Column({ type: "varchar", comment: "反应条件" })
  reactionCondition: string
}