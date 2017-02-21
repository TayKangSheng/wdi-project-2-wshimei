require('dotenv').config({silent: true})
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(session)

const userRouter = require('./routes/user_router')
const categoryRouter = require('./routes/category_router')
const itemRouter = require('./routes/item_router')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passportConfig')(passport)

app.use(flash())
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(ejsLayouts)
app.set('view engine', 'ejs')

app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/items', itemRouter)

app.get('/', (req, res) => {
  res.render('homepage')
})

let port = 4001
app.listen(port, function () {
  console.log('Shopping List is running on ' + port)
})
