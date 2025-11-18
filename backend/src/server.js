// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageroutes from './routes/message.route.js'

dotenv.config()
const PORT = process.env.PORT || 3000



const app = express()

app.get('/', (req, res)=>{
    res.send("Hello from Express server")
})

app.use('/api/auth', authRoutes)
app.use('/api/message', messageroutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}...`)
})