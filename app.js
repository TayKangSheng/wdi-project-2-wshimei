const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const app = express()
const bodyParser = require('body-parser')

const userRouter = require('./routes/user_router')
app.use('/', userRouter)

let port = 4001
app.listen(port, function () {
  console.log('Shopping List is running on ' + port)
})
