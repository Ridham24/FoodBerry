const express = require('express')
const app = express()
const { updateCart,getCart } = require('../controllers/routes')
app.put('/', updateCart)
app.post('/load',getCart)
module.exports = app
