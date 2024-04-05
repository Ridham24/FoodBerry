const express = require('express')
const app = express()
const {getAllCategory} =require( '../controllers/routes')
app.get('/', getAllCategory)
module.exports=app