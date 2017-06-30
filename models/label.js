const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {type: String, required: true},
  stampUrl: {type:String, required: true}
})

module.exports = mongoose.model('Label', schema)
