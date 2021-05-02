import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtomService } from '../system/atom/atom.service';
import entitys from './entitys';
import { MainDataService } from './maindata.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([...entitys]),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: process.env.SQL_TYPE as 'aurora-data-api-pg',
          host:
            process.env.NODE_ENV == 'dev'
              ? process.env.SQL_HOST_DEV
              : process.env.SQL_HOST_PRO,
          port:
            parseInt(
              process.env.NODE_ENV == 'dev'
                ? process.env.SQL_PORT_DEV
                : process.env.SQL_PORT_PRO,
            ) || 3306,
          username: process.env.SQL_USERNAME,
          password: process.env.SQL_PASSWORD,
          database: process.env.SQL_NAME,
          entities: [...entitys],
          synchronize: Boolean(process.env.SQL_SYNCHRONIZE),
        };
      },
    }),
  ],
  controllers: [],
  exports: [],
  providers: [MainDataService],
})
export class DatabaseModule {}
