const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  fullname: {type: String, required: true},
  profilePicUrl: String
})

module.exports = mongoose.model('Artist', schema)
