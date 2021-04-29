import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('atom')
export class Atom {
  //原子模型
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  en_name: string; //英文名
  @Column()
  ch_name: string; //中文名
  @Column()
  quality: Number; //质量
}
