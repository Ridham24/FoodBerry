const express = require('express')
const app=express()
const { createUser,getUser } = require('../controllers/routes')
const validator = require('express-validator')
const User=require('../models/Users')
app.post('/register',[
      validator.body('email').isEmail(),
  validator.body('password').isLength({ min: 5 })], createUser)
  app.post(
    '/login',
    getUser
  )
module.exports = app