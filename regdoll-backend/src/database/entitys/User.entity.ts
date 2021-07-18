/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-18 18:02:42
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-18 22:35:42
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, Generated } from 'typeorm';
import { ConstituentAtoms } from './ConstituentAtoms.entity';

@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ comment: "用户账号" })
  account: number
  @Column({ type: "varchar", comment: "真实名" })
  trueName: string

  @Column({ type: "varchar", comment: "密码" })
  password: string
  @Column({ type: "varchar", comment: "" })
  signature: string
  @Column({ type: "varchar", comment: "头像地址" })
  imgUrl: string

  @Column({ comment: "是否为管理员" })
  isAdmin: boolean
  @Column({ type: "int", comment: "权限" })
  authority: number
  @CreateDateColumn({ comment: '创建时间' })  // 自动生成列
  createdAt: string
}