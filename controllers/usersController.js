const UserModel = require('../models').User

class UsersController {
  addUser(req, res) {
    const newUser = req.body

    UserModel.build(newUser).save().then(savedUser => {
      return res.json(savedUser)
    }).catch(err => {
      return res.status(500).json({message: err})
    })
  }

  getUsers(req, res) {
    UserModel.findAll().then(usersFound => {
      return res.json(usersFound)
    }).catch(err => {
      return res.status(500).json({message: err})
    })
  }

  getComics(req, res) {
    const userId = req.params.userId

    UserModel.findById(userId)
      .then(user => {
        user.getComics()
          .then(comics => res.json(comics))
          .catch(err => {
            console.log(err)
            res.status(500).json({message: err})
          })
      }).catch(err => {
        console.log(err)
        res.status(500).json({message: err})
      })
  }

  getCollections(req, res) {
    const userId = req.params.userId

    UserModel.findById(userId)
      .then(user => user.getComics())
      .then(comics => res.json(comics))
      .catch(err => {
        console.log(err)
        res.status(500).json({message: err})
      })

      
      
     
  }

  updateUser(req, res) {
    const user = req.body,
      id = req.params.userId

    UserModel.update(user, {
      where: {id}
    }).then(affectedRows => {
      UserModel.findById(id).then(user => {
      return res.json(user)
      })
    })
  }

  deleteUser(req, res) {
    const id = req.params.userId

    UserModel.destroy({
      where: {id}
    }).then(() => {
      res.json({message: `User ${id} deleted`})
    }).catch(err => {
      res.status(500).json({message: err})
    })
  }

  getPage(req, res) {
    const offset = (req.params.page - 1 ) * 10,
      limit = 10

    UserModel.findAll({offset, limit})
      .then(users => {
        return res.json(users)
      }).catch(err => {
        return res.status(500).json({message : err})
        })
  }

  getCount(req, res) {
    UserModel.count().then(count => {
      return res.json({count})
    }).catch(err => {
      return res.status(500).json({message: err})
    })
  }
}

  module.exports = new UsersController()
