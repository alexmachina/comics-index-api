const express = require('express'),
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

  console.log('Listening to port: ',process.env.PORT)


})

module.exports = app

