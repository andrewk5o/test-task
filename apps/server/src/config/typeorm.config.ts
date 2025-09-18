import * as dotenv from 'dotenv';
dotenv.config();

import { DataSourceOptions } from 'typeorm';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';

export const typeOrmConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'appdb',
    entities: [User, Role],
    synchronize: true,
    logging: false,
};

