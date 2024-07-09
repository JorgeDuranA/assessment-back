import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'roc2postgresql.cgriqmyweq5c.us-east-2.rds.amazonaws.com',
  port: parseInt(process.env.XS_GLOBAL_DB_PORT),
  username: process.env.XS_GLOBAL_DB_USER,
  password: process.env.XS_GLOBAL_DB_PASS,
  database: process.env.XS_GLOBAL_DB_DATABASE,
  entities: [__dirname + '/src/database/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  synchronize: false,
  logging: false,
  autoLoadEntities: true,
  keepConnectionAlive: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export default ormconfig;
