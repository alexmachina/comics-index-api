const CollectionModel = require('../models').Collection

class CollectionsController {
  addCollection(req, res) {
    const collection = req.body

    CollectionModel.create(collection).then(savedCollection => {
      return res.json(savedCollection)
    }).catch(err => {
      return res.status(500).json({message : err})
    })
  }
}

module.exports = new CollectionsController()
