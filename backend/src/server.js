// const express = require('express')
import express from 'express'
import {ENV} from './lib/env.js'
import path from 'path'
import authRoutes from './routes/auth.route.js'
import messageroutes from './routes/message.route.js'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = ENV.PORT || 3000

app.use(express.json()) //parse the JSON and convert it to a JavaScript object.
app.use(cookieParser())

const __dirname = path.resolve()


app.use('/api/auth', authRoutes)
app.use('/api/message', messageroutes)

if(ENV.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/dist')))

    app.get('*',(_,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
    })
}

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}..`)
    connectDB()
})