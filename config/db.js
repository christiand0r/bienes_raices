import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD ?? "";

const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: 3306,
  dialect: "mariadb",
  define: {
    timestamp: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorAliases: false,
});

export default db;
