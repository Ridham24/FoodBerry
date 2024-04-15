const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const connectDB = require('./connect')
require('dotenv').config()
app.use(express.json())
app.use('/user', require('./routes/CreateUser'))
app.use('/home', require('./routes/Foods'))
app.use('/category', require('./routes/Category'))
app.use('/cart',require('./routes/Cart'))
app.use('/verify', require('./routes/Auth'))
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
