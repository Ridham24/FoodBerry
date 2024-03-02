const mongoose = require('mongoose')
const FoodItems = new mongoose.Schema({
  CategoryName: {
    type: String,
    required:true
  },
})
module.exports = mongoose.model('Category', FoodItems)
