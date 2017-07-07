const request = require('supertest'),
  assert = require('chai').assert,
  server = require('../../index.js'),
  userModel = require('../../models/user'),
  faker = require('faker'),
  fs = require('fs'),
  Sequelize = require('sequelize')
require('dotenv').config()

describe('Authentication', () => {
  let sequelize = null

  beforeEach(done => {
    fs.readFile('config/config.json', 'utf8', (err, data) => {
      if (err)
        throw new Error(err)
      data = JSON.parse(data)
      sequelize = new Sequelize(data.test.database, data.test.username, data.test.password, {
        host: data.test.host,
        dialect: data.test.dialect
      })

      done()
    })
  })

  it('Obtain authorization token', done => { 

    const user = {
      fullname: faker.name.findName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password()
    }

    let UserModel = userModel(sequelize, Sequelize)
    sequelize.sync().then(() => {
      UserModel.build(user).save().then(() => {
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
