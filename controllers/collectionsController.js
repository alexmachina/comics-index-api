const CollectionModel = require('../models').Collection
const UserModel = require('../models').User

class CollectionsController {
  addCollection(req, res) {
    const collection = req.body

    CollectionModel.create(collection).then(savedCollection => {
      return res.json(savedCollection)
    }).catch(err => {
      console.log(err)
      return res.status(500).json({message : err})
    })
  }

  getCollection(req, res) {
    const id = req.params.id
    CollectionModel.findOne({
      where: {id},
      include: [{model: UserModel}]
    }).then(collection => {
      return res.json(collection)

    }).catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
  }

  getUser(req, res) {
    const id = req.params.collectionId

    CollectionModel.findOne({
      where: {id}
    }).then(collection => {
      collection.getUser().then(user => {
        return res.json(user)
      }).catch(err => {
        console.log(err)
        return res.status(500).json(err)
      })
    }).catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })
  }

  getComics(req, res) {
    const id = req.params.collectionId
    CollectionModel.findById(id).then(collection => {
      collection.getComics()
        .then(comics => res.json(comics))
        .catch(err => {
          console.log(err)
          res.status(500).json({message: err})
        })
    }).catch(err =>{ 
      console.log(err)
      res.status(500).json({message: err})
    })
  }

  updateCollection(req, res) {
    const id = req.params.collectionId,
      newValues = req.body

    CollectionModel.update(newValues, {
      where: {id}
    }).then(results => {
      CollectionModel.findById(id).then(collection => {
        return res.json(collection)
      }).catch(err => {
        console.log(err)
        return res.status(500).json({message: err})
      })
    }).catch(err => {
      console.log(err)
      return res.status(500).json({message: err})
    })
  }

  deleteCollection(req, res) {
    const id = req.params.collectionId
    CollectionModel.destroy({
      where: {id},
    })
      .then(() => res.json({message: `Collection ${id} deleted`}))
      .catch(err => res.status(500).json({message: err}))

  }
}

module.exports = new CollectionsController()
