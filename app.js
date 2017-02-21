const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')

const userRouter = require('./routes/user_router')
const categoryRouter = require('./routes/category_router')
const itemRouter = require('./routes/item_router')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/shoppinglist')
mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/items', itemRouter)
app.get('/', (req, res) => {
  res.send('WELLOW HOMEPAGE')
})

let port = 4001
app.listen(port, function () {
  console.log('Shopping List is running on ' + port)
})
