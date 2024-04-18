const User = require('../models/Users')
const validator = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Food = require('../models/FoodItems')
const Category = require('../models/Category')
const Cart = require('../models/Cart')
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
    res.json({ success: true })
  } catch (err) {
    res.json({ success: false })
  }
}
const getUser = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email })
    if (!data) return res.status(401).json({ success: false })
    const cmp = await bcrypt.compare(req.body.password, data.password)
    if (!cmp) res.json({ success: false })
    else {
      const token = {
        user: { id: data._id },
      }
      console.log(data._id)
      const authToken = jwt.sign(token, process.env.JWT_SECRET)
      res.json({ success: true, authToken: authToken })
    }
  } catch (error) {
    console.log(error)
  }
}
const getFoods = async (req, res) => {
  try {
    const allFood = await Food.find({})
    // console.log(allFood)
    res.json(allFood)
  } catch (error) {
    console.log(error)
  }
}
const getCategoryFood = async (req, res) => {
  try {
    const catFood = await Food.find({ CategoryName: req.body.category })
    res.json(catFood)
  } catch (error) {
    console.log(error)
  }
}
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({})
    res.json(categories)
  } catch (error) {}
}
const updateCart = async (req, res) => {
  try {
    const id = req.body.id
    const cart = req.body.cart
    const temp = await Cart.findOne({ userId: id })
    console.log(temp)
    if (temp) {
      const theCart = temp.cartItems
      var flag=0
      theCart.map((item) => {
        if (item.id == cart.id && item.mode == cart.mode) {
          item.quantity = item.quantity + cart.quantity
          flag = 1
        }
      })
      if (flag == 0) theCart.push(cart)
      flag = 0
      const tempo = await Cart.findOneAndUpdate(
        { userId: id },
        { cartItems: theCart }
      )
    } else {
      const tempo = await Cart.create({ userId: id, cartItems: [cart] })
    }
    res.json(temp)
  } catch (error) {
    console.log(error)
  }
}
const verify = (req, res) => {
  const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET)
  res.json(decoded)
}
const getCart = async (req, res) => {
  try {
    const id = req.body.token
    const temp = await Cart.findOne({ userId: id })
    res.json(temp.cartItems)
  } catch (error) {
    console.log(error)
  }
}
const deleteItem = async (req, res) => {
  try {
    const user_id = req.body.user_id
    const temp = await Cart.findOne({ userId: user_id })
    const cart = temp.cartItems
    const newCart = cart.filter(
      (item) => item.id !== req.body.id || item.mode !== req.body.modes
    )
    const tem = await Cart.findOneAndUpdate(
      { userId: user_id },
      { cartItems: newCart }
    )
    res.json(tem)
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  createUser,
  getUser,
  getFoods,
  getCategoryFood,
  getAllCategory,
  updateCart,
  verify,
  getCart,
  deleteItem,
}
