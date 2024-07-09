import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();
console.log(
  '🚀 ~ file: ormconfig.cli.ts:8 ~ process.env.XS_GLOBAL_DB_HOST:',
  process.env.XS_GLOBAL_DB_HOST,
  { pass: process.env.XS_GLOBAL_DB_PASS },
);
const ormconfigcli = new DataSource({
  type: 'postgres',
  host: 'rocpostgresql.cgriqmyweq5c.us-east-2.rds.amazonaws.com',
  port: parseInt(process.env.XS_GLOBAL_DB_PORT),
  username: 'assessment-developer',
  password: 'iM0ZpXH3NN1SGk01F7Xx',
  database: 'assessment-dev',
  entities: [__dirname + '/src/database/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  synchronize: false,
  logging: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default ormconfigcli;
