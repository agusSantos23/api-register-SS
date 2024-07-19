import express from 'express'
import authRoutes from './routes/auth.routes.js'
import cors from 'cors'
const app = express()


app.use(cors({
  origin: 'http://localhost:5173',
}))
app.use(express.json())

app.use(authRoutes)

export default app