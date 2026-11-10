import type { NextFunction, Request, Response } from 'express'

export class AppError extends Error {
  statusCode: number
  details?: unknown

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.details = details
  }
}

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`))
}

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.details !== undefined ? { details: error.details } : {}),
    })
  }

  if (error instanceof Error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      ...(process.env.NODE_ENV !== 'production' ? { details: error.message } : {}),
    })
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
}
