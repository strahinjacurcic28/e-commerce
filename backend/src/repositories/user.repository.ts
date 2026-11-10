import { db } from '../config/db.js'

export interface UserRecord {
  id: number
  first_name: string
  last_name: string
  email: string
  password_hash: string
  role: string
  created_at: Date
  updated_at: Date
}

export const findUserByEmail = async (email: string) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email])
  return (rows as UserRecord[])[0] ?? null
}

export const findUserById = async (id: number) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ? LIMIT 1', [id])
  return (rows as UserRecord[])[0] ?? null
}

export const createUser = async (user: {
  first_name: string
  last_name: string
  email: string
  password_hash: string
  role?: string
}) => {
  const [result] = await db.execute(
    'INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
    [user.first_name, user.last_name, user.email, user.password_hash, user.role ?? 'customer'],
  )

  const insertId = Number((result as { insertId?: number }).insertId ?? 0)
  return findUserById(insertId)
}
