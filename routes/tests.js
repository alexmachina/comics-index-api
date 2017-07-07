const express = require('express')
const router = express.Router()
const secure = require('../middlewares/secure')
const authController = require('../controllers/authController')

router.get('/', (req, res) => {
  res.send('OK')
})

router.get('/secureRoute', secure, (req, res) => {
  res.json({message: 'Secure content'})
})



module.exports = router
