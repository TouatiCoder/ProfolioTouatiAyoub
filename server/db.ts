import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables (Adjust the path if your .env is elsewhere)
dotenv.config({ path: '../.env' });

// Create a connection pool using the string from your .env file
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;