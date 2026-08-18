import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { fileURLToPath } from "node:url";

dotenv.config({ path: fileURLToPath(new URL("../.env.local", import.meta.url)) });

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "elegance_db",
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

export default pool;
