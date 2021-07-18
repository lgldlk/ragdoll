/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-17 08:56:30
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-17 09:11:01
 */

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ConstituentAtoms } from './ConstituentAtoms.entity';

@Entity("scene_background")
export class SceneBackground {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: "varchar", comment: "背景名" })
  name: string
  @Column({ type: "varchar", comment: "存储文件名" })
  fileName: string
}