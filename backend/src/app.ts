import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { env } from './config/env.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
)
app.use(helmet())
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'nova-backend',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/auth', authRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
