const express = require('express')
const app = express()
const { getFoods,getCategoryFood } = require('../controllers/routes')
app.get('/', getFoods)
app.post('/category',getCategoryFood)
module.exports = app
