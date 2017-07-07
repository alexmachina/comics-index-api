const express = require('express'),
  router = express.Router(),
  authController = require('../controllers/authController'),
  usersController = require('../controllers/usersController')

router.post('/login', authController.login)

router.post('/user', usersController.addUser) 

module.exports = router
