import dotenv from 'dotenv'

dotenv.config()

const getEnv = (key: string, fallback?: string) => {
  const value = process.env[key]

  if (value === undefined || value === '') {
    if (fallback !== undefined) {
      return fallback
    }

    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

export const env = {
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  PORT: Number(getEnv('PORT', '5000')),
  DB_HOST: getEnv('DB_HOST', '127.0.0.1'),
  DB_PORT: Number(getEnv('DB_PORT', '3306')),
  DB_USER: getEnv('DB_USER', 'root'),
  DB_PASSWORD: getEnv('DB_PASSWORD', ''),
  DB_NAME: getEnv('DB_NAME', 'nova_db'),
  JWT_SECRET: getEnv('JWT_SECRET', 'change-me'),
  JWT_EXPIRES_IN: getEnv('JWT_EXPIRES_IN', '7d'),
  CORS_ORIGIN: getEnv('CORS_ORIGIN', 'http://localhost:5173'),
}
