const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

class AuthController {
  login(req, res) {
    const user = req.body

    if(!user)
      return res.status(500).json({message: 'No user!'})
    if(!user.username || !user.password)
      return res.status(500).json({message: 'No username or password provided'})

    let query =  userModel.findOne(
      {username: user.username, password: user.password})

    query.then(user => {
      if(!user)
        return res.status(404).json({message: 'User not found'})
      
      const token = jwt.sign({
          username: user.username, 
          password: user.password
        }, process.env.SECRET)

      return res.json({token})


    })
    

  }
}

module.exports = new AuthController()
