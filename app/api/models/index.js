import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOSTNAME,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  schema: process.env.DB_SCHEMA,
  logging: false
});

export default sequelize;