/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-04-28 19:22:19
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-15 08:40:04
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ConstituentAtoms } from './ConstituentAtoms.entity';

@Entity('atom')
export class Atom {
  //原子模型

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 6, comment: '原子英文名' })
  en_name: string;

  @Column({ type: 'varchar', length: 8, comment: '原子中文名' })
  ch_name: string;

  @Column({ type: 'float', comment: '原子质量' })
  quality: Number;

  @Column({ type: 'float', comment: '原子电子数' })
  ele_number: Number;

  // @Column({ type: "varchar", comment: "原子颜色" })
  // nucleusColor: string
  @Column({ type: "longtext", comment: "注意" })
  notice: string

  @Column({ type: "varchar", comment: "原子颜色" })
  color: string
  @Column({ type: "float", comment: "原子半径" })
  radius: number

  @Column({ type: "varchar", comment: "发现者" })
  finder: string

  @Column({ type: "varchar", comment: "熔点" })
  meltingPoint: string

  @Column({ type: "varchar", comment: "密度" })
  density: string

  @Column({ type: "varchar", comment: "化合价" })
  valence: string
  @Column({ type: "varchar", comment: "位置" })
  location: string

  @Column({ type: "varchar", comment: "物态（常温）" })
  matterState: string
  @Column({ type: "varchar", comment: "离子电荷量" })
  IonicCharge: string

  @OneToMany(() => ConstituentAtoms, conAtoms => conAtoms.atomId)
  atomPositions: ConstituentAtoms[];
}
