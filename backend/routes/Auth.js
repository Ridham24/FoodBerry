const express = require('express')
const app = express()
const { verify } = require('../controllers/routes')
app.post('/', verify)
module.exports = app
