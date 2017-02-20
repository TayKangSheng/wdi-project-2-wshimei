const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/shoppinglist')

const User = require('../models/user')

let userController = {
  new: (req, res) => {
    res.send('userController')
  }
}

module.exports = userController
