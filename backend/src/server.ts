import app from './app.js'
import { db, testDatabaseConnection } from './config/db.js'
import { env } from './config/env.js'

const startServer = async () => {
  try {
    await testDatabaseConnection()
    console.log('Database connection successful.')

    app.listen(env.PORT, () => {
      console.log(`NOVA backend running on http://localhost:${env.PORT}`)
    })
  } catch (error) {
    console.error('Failed to connect to MySQL database. Please ensure MySQL is running and the environment variables are valid.')
    console.error(error)
    await db.end()
    process.exit(1)
  }
}

startServer()
