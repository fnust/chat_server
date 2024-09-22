import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Config } from './app.config';
import { join } from 'path';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: Config.POSTGRES_HOST,
  port: Config.POSTGRES_PORT,
  username: Config.POSTGRES_USER,
  password: Config.POSTGRES_PASSWORD,
  database: Config.POSTGRES_DB,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: true,
};
