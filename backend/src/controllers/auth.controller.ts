import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { AppError } from '../middleware/errorHandler.js'
import { getCurrentUser, loginUser, registerUser } from '../services/auth.service.js'

const registerSchema = z.object({
  firstName: z.string().trim().min(2, 'First name is required').max(100),
  lastName: z.string().trim().min(2, 'Last name is required').max(100),
  email: z.string().trim().email('Please provide a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

const loginSchema = z.object({
  email: z.string().trim().email('Please provide a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = registerSchema.parse(req.body)
    const result = await registerUser(payload)

    res.status(201).json({
      success: true,
      data: result,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(400, 'Validation error', error.issues))
    }

    return next(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = loginSchema.parse(req.body)
    const result = await loginUser(payload)

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(400, 'Validation error', error.issues))
    }

    return next(error)
  }
}

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new AppError(401, 'Authentication required'))
    }

    const result = await getCurrentUser(req.user.id)

    return res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    return next(error)
  }
}
