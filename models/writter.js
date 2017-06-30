const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  fullname: {type: String, required: true},
  profilePicUrl: {type: String, required: true},
  
})

module.exports = mongoose.model('Writter', schema)
