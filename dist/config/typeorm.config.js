"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.typeormConfig = void 0;
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)();
exports.typeormConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    entities: [__dirname + '../../core/entities/*.entity.{js,ts}'],
    migrations: [__dirname + '../../migrations/*{.ts,.js}'],
    logging: false,
};
exports.dataSource = new typeorm_1.DataSource(exports.typeormConfig);
//# sourceMappingURL=typeorm.config.js.map