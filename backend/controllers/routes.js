const User = require('../models/Users')
const validator = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Food = require('../models/FoodItems')
const createUser = async (req, res) => {
  try {
    const result = validator.validationResult(req)
    console.log(result)
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() })
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = secPass
    const task = await User.create(req.body)
    res.send('Success')
  } catch (err) {
    res.send('controller issue')
  }
}
const getUser = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email })
    if (!data) return res.status(401).json({ success: false })
    const cmp = await bcrypt.compare(req.body.password, data.password)
    if (!cmp) res.json({success:false})
    else {
      const token = {
    user:{id:data.id}
      }
      const authToken=jwt.sign(token,process.env.JWT_SECRET)
      res.json({success:true,authToken:authToken})
    }
  } catch (error) {
    console.log(error)
  }
}
const getFoods = async (req, res) => {
 try{ 
  const allFood = await Food.find({})
  // console.log(allFood)
    res.json(allFood)
  }
  catch (error)
 {
   console.log(error);
  }
}
module.exports = { createUser, getUser,getFoods }
