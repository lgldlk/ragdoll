import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atom } from 'src/database/entitys/Atom.entity';
import { AtomController } from './atom.controller';
import { AtomService } from './atom.service';

@Module({
  imports: [TypeOrmModule.forFeature([Atom])],
  controllers: [AtomController],
  providers: [AtomService],
})
export class AtomModule {}
