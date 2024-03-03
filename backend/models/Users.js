const mongoose = require('mongoose')
const UserInfo = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    location: {
        type:String
    }
})
module.exports=mongoose.model('User',UserInfo)