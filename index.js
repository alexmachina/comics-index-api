const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const router = require('./router.js')


let app = express()

app.use(bodyParser.json())
app.use(router)


app.listen(process.env.PORT, (err) => {
  if (err)
    console.log(err)

  mongoose.connect(process.env.MONGODB_URL)

  console.log('Listening to port: ',process.env.PORT)
  console.log('Mongoose connected')


})

module.exports = app

