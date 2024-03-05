import { DataSource } from "typeorm"
import 'reflect-metadata';
import { User } from "@nosleepfullbuild/uniride-library/dist/entity/user/user.entity";

// read .env
require('dotenv').config();

export const AppDataSource = new DataSource({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    type: 'postgres',
    synchronize: true,
    logging: false,
    entities: [User],
    // migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
  