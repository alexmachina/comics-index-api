const collectionsController = require('../controllers/collectionsController'),
  express = require('express'),
  router = express.Router()


router.post('/collection', collectionsController.addCollection)

module.exports = router


