const express = require('express')
const app = express()
const { addOrder ,getOrders} = require('../controllers/routes')
app.post('/', addOrder)
app.post('/get',getOrders)
module.exports = app
