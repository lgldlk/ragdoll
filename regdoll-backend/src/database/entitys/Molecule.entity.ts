/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-12 08:29:56
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-16 10:07:31
 */
/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-12 08:29:56
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-12 08:50:54
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ConstituentAtoms } from './ConstituentAtoms.entity';

@Entity('molecule')
export class Molecule {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', comment: '分子名' })
  name: string;
  @Column({ type: "varchar", comment: "分子表达式" })
  expression: string;
  @Column({ type: "longtext", comment: "知识点" })
  knowledgePoint: string

  @Column({ type: "varchar", comment: "物态（常温）" })
  matterState: string

  @Column({ type: "varchar", comment: "熔点" })
  meltingPoint: string

  @Column({ type: "varchar", comment: "密度" })
  density: string
  @Column({ type: "varchar", comment: "反应活性" })
  reactivity: string

  @OneToMany(() => ConstituentAtoms, constituentAtoms => constituentAtoms.molecule)
  atomDatas: ConstituentAtoms[];
}