require('dotenv').config({silent: true})

const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const passport = require('passport')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')(session)

const userRouter = require('./routes/user_router')
const categoryRouter = require('./routes/category_router')
const itemRouter = require('./routes/item_router')
const familyRouter = require('./routes/family_router')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
}).then(
  function () { // resolve cb
    console.log('connected successfully')
  },
  function (err) { // reject cb
    console.log(err)
  }
)

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

  return res.redirect('/')
}

// blocked those who are logged in
function isLoggedIn (req, res, next) {
  if (req.isAuthenticated() === false) return next()

  return res.redirect('/families/list')
}

app.use(function (req, res, next) {
  app.locals.user = req.user
  app.locals.isAuthenticated = req.isAuthenticated()
  app.locals.errors = req.flash('error')
  app.locals.infos = req.flash('infos')

  next()
})

app.use('/users', userRouter)
app.use('/categories', isNotLoggedIn, categoryRouter)
app.use('/items', isNotLoggedIn, itemRouter)
app.use('/families', isNotLoggedIn, familyRouter)

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
