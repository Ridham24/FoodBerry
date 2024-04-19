const express = require('express')
const app = express()
const { addOrder } = require('../controllers/routes')
app.post('/', addOrder)
module.exports = app
