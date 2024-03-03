const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const connectDB = require('./connect')
require('dotenv').config()
app.use(express.json())
app.use('/user', require('./routes/CreateUser'))
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
