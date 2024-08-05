import mysql from "mysql2/promise";
import fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function databaseExists(connection, databaseName) {
  try {
    const [rows] = await connection.query("SHOW DATABASES LIKE ?", [
      databaseName,
    ]);
    return rows.length > 0;
  } catch (error) {
    console.error("Database not found:", error);
    return false;
  }
}

async function runSqlScript(filePath) {
  const sql = await fs.readFile(filePath, "utf-8");

  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    port: Number(process.env.DB_PORT) || 3306,
    multipleStatements: true,
  });

  const databaseName = "TeacherAi";

  const databaseAlreadyExists = await databaseExists(connection, databaseName);

  if (databaseAlreadyExists) {
    console.log(`Database "${databaseName}" already exists.`);
  } else {
    await connection.query(sql);
    console.log("SQL script successfully executed.");
  }

  await connection.end();
}

const file = path.join(__dirname, "script.sql");

runSqlScript(file)
  .then(() => {
    console.log("SQL script successfully executed.");
  })
  .catch((err) => {
    console.error("Error executing SQL script:", err);
  });
