const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  if(token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(err)
        return res.status(500).json({message:'Invalid token'})

    })
  } else {
    return res.status(403).json({message: 'No token!'})
  }

}
