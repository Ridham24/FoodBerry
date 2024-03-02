const express = require('express')
const app = express()
const connectDB = require('./connect')
require('dotenv').config()
const router = require('./routes/Foods.js')
// router()
const start = async () => {
  try {
    // console.log(process.env.MONGO_URL)
    await connectDB(process.env.MONGO_URL)
    app.listen(3000, (req, res) =>
      console.log('Server listening on port 3000...')
    )
  } catch (error) {
    console.log('Database Error')
  }
}
start()
