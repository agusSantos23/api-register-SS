import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import homeRoutes from './routes/home.routes.js'

const app = express()

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(cookieParser())

app.use(authRoutes)
app.use(homeRoutes)

export default app