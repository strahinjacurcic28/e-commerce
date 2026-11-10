import { sign, verify, type Secret } from 'jsonwebtoken'

import { env } from '../config/env.js'

export interface AuthTokenPayload {
  id: number
  email: string
  role: string
}

const jwtSecret: Secret = env.JWT_SECRET
const jwtExpiresIn = env.JWT_EXPIRES_IN as any

export const signToken = (payload: AuthTokenPayload) => {
  return sign(payload, jwtSecret, {
    expiresIn: jwtExpiresIn,
  })
}

export const verifyToken = (token: string) => {
  return verify(token, jwtSecret) as AuthTokenPayload
}
