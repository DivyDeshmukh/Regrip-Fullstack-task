import dotenv from "dotenv";

dotenv.config({
   path: "./.env"
});
import Sequelize from 'sequelize';

// Initialize Sequelize instance
const sequelize = new Sequelize(
  process.env.DATABASE_NAME || "",
  process.env.DATABASE_USERNAME || "",
  process.env.DATABASE_PASSWORD || "",
  {
    host: process.env.HOST || "localhost",
    dialect: 'mysql'
  }
);

export default sequelize;
