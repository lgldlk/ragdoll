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
}
