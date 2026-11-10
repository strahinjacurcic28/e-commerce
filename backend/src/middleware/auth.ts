import type { NextFunction, Request, Response } from 'express'

import { AppError } from './errorHandler.js'
import { verifyToken } from '../utils/jwt.js'

export const protect = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError(401, 'Authentication required'))
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const payload = verifyToken(token)

    req.user = {
      id: Number(payload.id),
      email: String(payload.email),
      role: String(payload.role),
    }

    return next()
  } catch (error) {
    return next(new AppError(401, 'Invalid or expired token'))
  }
}

export const requireAdmin = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new AppError(403, 'Admin access required'))
  }

  return next()
}
