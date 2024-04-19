const express = require('express')
const app = express()
const { updateCart,getCart ,deleteItem,resetCart} = require('../controllers/routes')
app.put('/', updateCart)
app.post('/load',getCart)
app.post('/delete', deleteItem)
app.put('/reset',resetCart)
module.exports = app
