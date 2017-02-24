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

// blocks those who are not logged in
function isNotLoggedIn (req, res, next) {
  if (req.isAuthenticated()) return next()

  req.flash('flash', {
    type: 'danger',
    message: 'Restricted Page: Please login'
  })
  return res.redirect('/')
}

// blocked those who are logged in
function isLoggedIn (req, res, next) {
  if (req.isAuthenticated() === false) return next()

  req.flash('flash', {
    type: 'danger',
    message: 'You are already logged in'
  })
  return res.redirect('/categories/list')
}

app.use(function (req, res, next) {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

app.use('/users', userRouter)
app.use('/categories', isNotLoggedIn, categoryRouter)
app.use('/items', isNotLoggedIn, itemRouter)

app.get('/', isLoggedIn, (req, res) => {
  res.render('homepage')
})

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

let port = process.env.PORT || 4001
app.listen(port, function () {
  console.log('Shopping List is running on port ' + port)
})
