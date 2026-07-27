import mysql from "mysql2/promise";

const hasDbConfig = Boolean(
  process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME
);

const pool = hasDbConfig
  ? mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME,
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0,
    })
  : null;

export async function query(sql, params = []) {
  if (!pool) {
    throw new Error("Database is not configured. Set DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME.");
  }

  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(sql, params);
    return rows;
  } finally {
    connection.release();
  }
}
