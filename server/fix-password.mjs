import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config({ path: './.env' });

const conn = await mysql.createConnection({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'forge_scale',
});

const hash = await bcrypt.hash('ayoub2001@', 10);
const [result] = await conn.execute(
  "UPDATE users SET password_hash = ? WHERE email = 'admin@touatiayoub.com'",
  [hash]
);
console.log('Updated rows:', result.affectedRows);
await conn.end();
