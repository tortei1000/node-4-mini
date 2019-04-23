require('dotenv').config()
const express = require('express')
const messageCtrl = require('./messageCtrl')

let app = express()
let {SERVER_PORT}= process.env

app.use(express.json())

app.listen(SERVER_PORT, ()=>{
    console.log(`I am listening at port ${SERVER_PORT}`)
})


app.get('/api/messages', messageCtrl.getAllMessages)
app.post('/api/messages', messageCtrl.createMessage)