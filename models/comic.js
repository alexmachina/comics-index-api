const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
  title: {type: String, required:true},
  subtitle: String,
  collection: {type: ObjectId, ref: 'Collection'},
  writters: [{type: ObjectId, ref: 'Writter'}],
  artists: [{type: ObjectId, ref: 'Artist'}],
  coverUrl: {type: String, required: true},
  hasBeenRead: Boolean
  
})

module.exports = mongoose.model('Comic', schema)
