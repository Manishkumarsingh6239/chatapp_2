// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import authRoutes from './routes/auth.route.js'
import messageroutes from './routes/message.route.js'
import { connectDB } from './lib/db.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000

app.use(express.json()) //parse the JSON and convert it to a JavaScript object.

const __dirname = path.resolve()


app.use('/api/auth', authRoutes)
app.use('/api/message', messageroutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/dist')))

    app.get('*',(_,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
    })
}

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}..`)
    connectDB()
})