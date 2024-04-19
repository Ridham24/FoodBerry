const mongoose = require('mongoose')
const OrderInfo = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  Orders: {
    type: Array,
  },
})
module.exports = mongoose.model('Orders', OrderInfo)
