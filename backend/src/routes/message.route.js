import express from 'express'
const router = express.Router()

router.get('/send', (req, res)=>{
    res.send("send message endpoint")
})

router.get('/inbox', (req, res)=>{
    res.send("inbox endpoint")
})

export default router