const mongoose = require('mongoose')
const CartInfo = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Array,
  },
})
module.exports = mongoose.model('Cart', CartInfo)
