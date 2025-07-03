/* global process */
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions:
      process.env.DB_HOST === "localhost" || process.env.DB_HOST === "127.0.0.1"
        ? {}
        : {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          },
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);

    if (error.original) {
      if (error.original.code === "ECONNREFUSED") {
        console.error("Database connection was refused.");
      } else if (error.original.code === "ER_ACCESS_DENIED_ERROR") {
        console.error("Access denied for user. Check your credentials.");
      } else if (error.original.code === "ENOTFOUND") {
        console.error("Database host not found. Check your DB_HOST.");
      }
    }
    return false;
  }
};

export default sequelize;
