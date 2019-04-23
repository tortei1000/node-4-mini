require('dotenv').config()
const express = require('express')
const messageCtrl = require('./messageCtrl')
const session = require('express-session')

let app = express()
let {SERVER_PORT, SESSION_SECRET}= process.env

app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))

  app.use((req, res, next) => {
    let badWords = ['knucklehead', 'jerk', 'internet explorer'];
    if (req.body.message) {
      for (let i = 0; i < badWords.length; i++) {
        let regex = new RegExp(badWords[i], 'g');
        req.body.message = req.body.message.replace(regex, '****');
      }
      next();
    } else {
      next();
    }
  });

app.listen(SERVER_PORT, ()=>{
    console.log(`I am listening at port ${SERVER_PORT}`)
})


app.get('/api/messages', messageCtrl.getAllMessages)
app.get('/api/messages/history', messageCtrl.history)
app.post('/api/messages', messageCtrl.createMessage)