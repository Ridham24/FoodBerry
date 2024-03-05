const express = require('express')
const app = express()
const { getFoods } = require('../controllers/routes')
app.get('/', getFoods)
module.exports = app
