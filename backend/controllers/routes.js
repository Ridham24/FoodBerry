const User = require('../models/Users')
const validator = require('express-validator')
const createUser = async (req, res) => {
  try {
      console.log(req.body)
    const result = validator.validationResult(req)
    // console.log(result)
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() })
    }
    const task = await User.create(req.body)
    res.send('Success')
  } catch (err) {
    res.send('controller issue')
  }
}
module.exports = { createUser }
