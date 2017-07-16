const collectionsController = require('../controllers/collectionsController'),
  express = require('express'),
  router = express.Router()


router.post('/collection', collectionsController.addCollection)
router.get('/collection/:id',collectionsController.getCollection)
router.get('/collection/:collectionId/user',collectionsController.getUser)
router.get('/collection/:collectionId/comics', collectionsController.getComics)
router.put('/collection/:collectionId', collectionsController.updateCollection)
router.delete('/collection/:collectionId', collectionsController.deleteCollection)

module.exports = router


