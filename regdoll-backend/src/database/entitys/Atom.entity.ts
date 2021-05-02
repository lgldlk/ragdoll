import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
