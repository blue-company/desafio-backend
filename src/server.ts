import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import dotenv from 'dotenv'
import path from "path";

dotenv.config()

const app = express()

app.use(cors())

app.use('/static', express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/api', userRoutes)

app.listen(process.env.PORT)


