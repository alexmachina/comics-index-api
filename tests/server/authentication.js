const request = require('supertest')
const assert = require('chai').assert
const server = require('../../index.js')
const userModel = require('../../models/user')
const mongoose = require('mongoose')
require('dotenv').config()

describe('Authentication', () => {
  it('Obtain authorization token', done => { 
    mongoose.connect(process.env.TESTS_MONGODB_URL)

    let user = new userModel({
      fullname: 'Alex Alonso',
      username: 'aalonso',
      password: 'mypass',
      email: 'alex.xmde@gmail.com'
    })

    user.save().then(user => {
      request(server)
        .post('/login')
        .set('Accept','application/json')
        .send(user)
        .expect(200)
        .end((err, res) => {
          console.log('end')
          if(err)
            throw new Error(err)
          assert.isDefined(res.body.token)

          done()
    })
  })
  })

  it('Receives 404 when user does not match', done => {
    let user = { username:'idonot', password:'exist' }
    request(server)
      .post('/login')
      .send(user)
      .set('Accept','application/json')
      .expect(404)
      .end((err, res) => {
        if(err)
          throw new Error(err)

        assert.equal(res.body.message, 'User not found')
        done()
      })
  })
})
