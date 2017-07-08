const express = require('express'),
  router = express.Router(),
  authController = require('../controllers/authController'),
  usersController = require('../controllers/usersController')

router.post('/login', authController.login)

router.post('/user', usersController.addUser) 
router.get('/users', usersController.getUsers)
router.put('/user/:userId', usersController.updateUser)
router.delete('/user/:userId', usersController.deleteUser)

module.exports = router
