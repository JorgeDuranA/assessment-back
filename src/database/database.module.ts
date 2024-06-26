import config from '@/config';
import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../../ormconfig';
@Global()
@Module({
  exports: [TypeOrmModule],
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { type, username, host, database, password, port } =
          configService.postgres;
        return {
          ...ormconfig,
          type: type as any,
          host: host,
          port: port,
          username: username,
          password: password,
          database: database,
          // logging: ['query', 'error'],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
