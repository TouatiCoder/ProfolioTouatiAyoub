import mysql from 'mysql2/promise';
import 'dotenv/config';

const DB_PORT = Number(process.env.DB_PORT ?? 3306);
const DB_CONNECTION_LIMIT = Number(process.env.DB_CONNECTION_LIMIT ?? 10);

export const pool = mysql.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number.isNaN(DB_PORT) ? 3306 : DB_PORT,
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'forge_scale',
  waitForConnections: true,
  connectionLimit: Number.isNaN(DB_CONNECTION_LIMIT) ? 10 : DB_CONNECTION_LIMIT,
  queueLimit: 0,
  charset: 'utf8mb4',
});

export async function testConnection(): Promise<void> {
  const connection = await pool.getConnection();

  try {
    await connection.ping();
    console.log('MySQL connected');
  } finally {
    connection.release();
  }
}

export async function closePool(): Promise<void> {
  await pool.end();
}
