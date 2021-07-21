/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-19 07:56:00
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 07:57:52
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, Generated, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity';

@Entity("user_belong")
export class UserBelong {
  @PrimaryGeneratedColumn()
  id: number
  @OneToOne(() => User)
  @JoinColumn()
  userAccount: User;
  @OneToOne(() => User)
  @JoinColumn()
  belongAccount: User;
}