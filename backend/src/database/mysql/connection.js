import mysql from "mysql2/promise";
import { config } from "dotenv";
config();

const dbPort = Number(process.env.DB_PORT);
console.log(dbPort);

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: dbPort,
});

export default connection;
