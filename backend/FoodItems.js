const mongoose = require('mongoose')
const FoodItems = new mongoose.Schema({
    CategoryName: {
        type: String
    },
    name: {
        type: String,
        required:true
        },
    img: {
        type:String
    },
        options: [
            {
                type:Array
            }
        ],
    description: {
        type: String,
        default:'No description for this food item has been provided'
        }
})
module.exports=mongoose.model('Food',FoodItems)
