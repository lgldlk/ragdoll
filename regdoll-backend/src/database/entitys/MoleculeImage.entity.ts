/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-13 08:29:04
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-13 08:30:42
 */

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('moleculeImage')
export class MoleculeImage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", comment: "文件名" })
  fileName: string
}