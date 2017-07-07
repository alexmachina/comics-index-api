const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  testsRouter = require('./routes/tests'),
  usersRouter = require('./routes/users')

require('dotenv').config()



let app = express()

app.use(bodyParser.json())
app.use(testsRouter)
app.use(usersRouter)


app.listen(process.env.PORT, (err) => {
  if (err)
    console.log(err)

  mongoose.connect(process.env.MONGODB_URL)

  console.log('Listening to port: ',process.env.PORT)
  console.log('Mongoose connected')


})

module.exports = app

