import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import router from './routes/taskRoutes.js'
import { logger } from './logger.js'
import { errorHandler } from './middleware/errorHandler.js'

const port = process.env.port || 5000
const app = express()

app.use(logger)
app.use(cors())
app.use(express.json())

app.use('/api/tasks', router)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server ruuning on http://localhost:${port}`)
})