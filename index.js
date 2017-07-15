const express = require('express'),
  authController = require('./controllers/authController')
  bodyParser = require('body-parser'),
  testsRouter = require('./routes/tests'),
  usersRouter = require('./routes/users'),
  collectionsRouter = require('./routes/collections'),
  secure = require('./middlewares/secure')

require('dotenv').config()



let app = express()

app.use(bodyParser.json())
app.use(secure)
app.use(testsRouter)
app.use(usersRouter)
app.use(collectionsRouter)

app.post('/login', authController.login)

app.listen(process.env.PORT, (err) => {
  if (err)
    console.log(err)

  console.log('Listening to port: ',process.env.PORT)


})

module.exports = app

