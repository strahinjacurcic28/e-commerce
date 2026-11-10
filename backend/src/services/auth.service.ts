import { AppError } from '../middleware/errorHandler.js'
import { findUserByEmail, findUserById } from '../repositories/user.repository.js'
import { signToken } from '../utils/jwt.js'
import { comparePassword, hashPassword } from '../utils/password.js'

export interface RegisterInput {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

const sanitizeUser = (user: {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
}) => ({
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email,
  role: user.role,
})

export const registerUser = async ({ firstName, lastName, email, password }: RegisterInput) => {
  const existingUser = await findUserByEmail(email.toLowerCase())

  if (existingUser) {
    throw new AppError(409, 'An account with this email already exists')
  }

  const passwordHash = await hashPassword(password)

  const user = await (await import('../repositories/user.repository.js')).createUser({
    first_name: firstName,
    last_name: lastName,
    email: email.toLowerCase(),
    password_hash: passwordHash,
    role: 'customer',
  })

  if (!user) {
    throw new AppError(500, 'Unable to create user')
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role })

  return {
    user: sanitizeUser(user),
    token,
  }
}

export const loginUser = async ({ email, password }: LoginInput) => {
  const user = await findUserByEmail(email.toLowerCase())

  if (!user) {
    throw new AppError(401, 'Invalid email or password')
  }

  const isPasswordValid = await comparePassword(password, user.password_hash)

  if (!isPasswordValid) {
    throw new AppError(401, 'Invalid email or password')
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role })

  return {
    user: sanitizeUser(user),
    token,
  }
}

export const getCurrentUser = async (id: number) => {
  const user = await findUserById(id)

  if (!user) {
    throw new AppError(404, 'User not found')
  }

  return {
    user: sanitizeUser(user),
  }
}
