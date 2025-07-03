/* global process */
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Determine if we're in production or development
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;
const isDocker = process.env.DB_HOST === 'mysql'; // Docker service name

// Default to local database for development
const defaultHost = isDevelopment ? "127.0.0.1" : null;
const defaultPort = isDevelopment ? 3306 : null;
const defaultUser = isDevelopment ? "root" : null;
const defaultPassword = isDevelopment ? "" : null;
const defaultDatabase = isDevelopment ? "quiknotes_db" : null;

console.log(`Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
console.log(`Docker mode: ${isDocker ? 'YES' : 'NO'}`);

const sequelize = new Sequelize(
  process.env.DB_NAME || defaultDatabase,
  process.env.DB_USER || defaultUser,
  process.env.DB_PASSWORD || defaultPassword,
  {
    host: process.env.DB_HOST || defaultHost,
    port: process.env.DB_PORT || defaultPort,
    dialect: "mysql",
    logging: isDevelopment, // Enable logging in development
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions:
      process.env.DB_HOST === "localhost" || process.env.DB_HOST === "127.0.0.1" || isDevelopment || isDocker
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
    console.log(`Attempting to connect to database at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    console.log(`Database: ${process.env.DB_NAME}, User: ${process.env.DB_USER}`);
    
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    console.error("Environment variables:");
    console.error(`DB_HOST: ${process.env.DB_HOST}`);
    console.error(`DB_PORT: ${process.env.DB_PORT}`);
    console.error(`DB_NAME: ${process.env.DB_NAME}`);
    console.error(`DB_USER: ${process.env.DB_USER}`);

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
