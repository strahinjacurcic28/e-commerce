import mysql from 'mysql2/promise'

import { env } from './env.js'

export const db = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
})

export async function testDatabaseConnection() {
  const [rows] = await db.execute('SELECT 1 AS ok')
  return rows
}
