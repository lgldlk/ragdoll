/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-05-02 14:16:05
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-09 14:51:33
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsBoolean,
  isNotEmpty,
} from 'class-validator';

export class AtomDto {
  @ApiProperty({ description: '原子英文名', uniqueItems: true })
  @IsString({ message: '原子英文名错误' })
  @IsNotEmpty({ message: '原子英文名不能为空' })
  en_name: string;

  @ApiProperty({ description: '原子中文名', uniqueItems: true })
  @IsString({ message: '原子中文名错误' })
  @IsNotEmpty({ message: '原子中文名不能为空' })
  ch_name: string;

  @ApiProperty({ description: '原子质量', uniqueItems: true })
  @IsNumber({}, { message: '原子质量错误' })
  @IsNotEmpty({ message: '原子质量不能为空' })
  quality: Number;

  @ApiProperty({ description: '原子电子数', uniqueItems: true })
  @IsNumber({}, { message: '原子电子数错误' })
  @IsNotEmpty({ message: '原子电子数不能为空' })
  ele_number: Number;


  @ApiProperty({ description: '注意事项', uniqueItems: true })
  @IsString({ message: '原子注意事项错误' })
  notice: string

  @ApiProperty({ description: '发现者', uniqueItems: true })
  @IsString({ message: '发现者错误' })
  finder: string

  @ApiProperty({ description: '熔点描述', uniqueItems: true })
  @IsString({ message: '熔点错误' })
  meltingPoint: string

  @ApiProperty({ description: '密度', uniqueItems: true })
  @IsString({ message: '密度错误' })
  density: string

  @ApiProperty({ description: '化合价', uniqueItems: true })
  @IsString({ message: '化合价错误' })
  valence: string
  @ApiProperty({ description: '周期', uniqueItems: true })
  @IsString({ message: '周期错误' })
  period: string
  @ApiProperty({ description: '族', uniqueItems: true })
  @IsString({ message: '族错误' })
  race: string
  @ApiProperty({ description: '区', uniqueItems: true })
  @IsString({ message: '区描述错误' })
  zone: string
  @ApiProperty({ description: '物态（常温）', uniqueItems: true })
  @IsString({ message: '物态（常温）描述错误' })
  matterState: string
  @ApiProperty({ description: '离子电荷量', uniqueItems: true })
  @IsString({ message: '离子电荷量描述错误' })
  IonicCharge: string
  // @ApiProperty({ description: '原子颜色', uniqueItems: true })
  // @IsString({ message: '原子颜色描述错误' })
  // nucleusColor: string
}
