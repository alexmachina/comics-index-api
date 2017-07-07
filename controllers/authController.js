const UserModel = require('../models').User,
  jwt = require('jsonwebtoken')

class AuthController {
  login(req, res) {
    const user = req.body

    if(!user)
      return res.status(500).json({message: 'No user!'})
    if(!user.username || !user.password)
      return res.status(500).json({message: 'No username or password provided'})

      UserModel.findOne({where : {
        username: req.body.username,
        password: req.body.password
      }})
      .then(user => {
        if(user) {
          const token = jwt.sign({
            username: user.username, 
            password: user.password
          }, process.env.SECRET)

          return res.json({token})
        } else {
          return res.status(404).json({message: 'User not found'})
        }
      })


    
  }
}

module.exports = new AuthController()
