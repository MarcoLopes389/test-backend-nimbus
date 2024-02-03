import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: [__dirname + '../../core/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '../../migrations/*{.ts,.js}'],
  logging: false,
};

export const dataSource = new DataSource(typeormConfig);
