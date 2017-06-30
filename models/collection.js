const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
  title: {type: String, required: true},
  completed: Boolean,
  size: Number,
  coverUrl: {type: String, required: true}
})

module.exports = mongoose.model('Collection', schema)
