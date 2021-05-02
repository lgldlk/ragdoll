import { AtomModule } from './atom/atom.module';
import { Module } from '@nestjs/common';
import { AtomService } from './atom/atom.service';

@Module({
  imports: [AtomModule],
  controllers: [],
  providers: [],
})
export class SystemModule {}
