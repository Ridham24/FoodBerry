const express = require('express')
const app = express()
const { updateCart,getCart ,deleteItem} = require('../controllers/routes')
app.put('/', updateCart)
app.post('/load',getCart)
app.post('/delete', deleteItem)
module.exports = app
