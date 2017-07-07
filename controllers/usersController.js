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
}

module.exports = new UsersController()
