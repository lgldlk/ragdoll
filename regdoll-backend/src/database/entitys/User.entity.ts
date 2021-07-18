/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-18 18:02:42
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-18 20:58:08
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ConstituentAtoms } from './ConstituentAtoms.entity';

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", comment: "用户名" })
  username: string
  @Column({ type: "varchar", comment: "密码" })
  password: string
  @Column({ type: "varchar", comment: "" })
  signature: string
  @Column({ type: "varchar", comment: "头像地址" })
  imgUrl: string

  @Column({ comment: "是否为管理员" })
  isAdmin: boolean
  @Column({ type: "number", comment: "权限" })
  authority: number
}