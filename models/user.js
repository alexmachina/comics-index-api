const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  fullname: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true}
})

module.exports = mongoose.model('User', schema)
