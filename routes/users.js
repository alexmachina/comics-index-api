const express = require('express'),
  router = express.Router(),
  authController = require('../controllers/authController'),
  usersController = require('../controllers/usersController')


router.post('/user', usersController.addUser) 
router.get('/users', usersController.getUsers)
router.get('/users/page/:page', usersController.getPage)
router.get('/users/count', usersController.getCount)
router.get('/user/:userId/collections', usersController.getCollections)
router.get('/user/:userId/comics', usersController.getComics)
router.put('/user/:userId', usersController.updateUser)
router.delete('/user/:userId', usersController.deleteUser)

module.exports = router
