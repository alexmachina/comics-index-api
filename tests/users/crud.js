const assert = require('chai').assert,
  request = require('supertest'),
  server = require('../../index'),
  userModel = require('../../models/user'),
  Sequelize = require('sequelize'),
  fs = require('fs'),
  faker = require('faker')
require('dotenv').config()


describe('CRUD Operations on Users', () => {
  let sequelize = null
  let aUser = {}
  beforeEach(done => {

    fs.readFile('config/config.json', 'utf8', (err, data) => {
      if(err)
        throw new Error(err)
      data = JSON.parse(data)
      
      sequelize = new Sequelize(data.test.database, data.test.username, data.test.password, {
        host: data.test.host,
        dialect: data.test.dialect
      })
      const UserModel = userModel(sequelize, Sequelize)
      promises = []
      sequelize.sync().then( () => {
        UserModel.truncate().then(() => {
          for(let i = 0; i < 10; i++) {
            const user = {
              fullname: faker.name.findName(),
              email: faker.internet.email(),
              username: faker.internet.userName(),
              password: faker.internet.password()
            }

            promises.push(UserModel.build(user).save())
          }

          Promise.all(promises).then(results => {
            const randomId = Math.floor(Math.random() * (10 - 1) + 1) //A random number between 1 and 10
            aUser = results[randomId].dataValues
            done()
          })
        })
      })
    })
  })
  it('Inserts an user', done => {
    const newUser = {
      fullname: faker.name.findName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email()
    }

    const url = '/user'

    request(server)
      .post(url)
      .set('Accept','application/json')
      .send(newUser)
      .expect(200)
      .end((err, res) => {
        if(err)
          throw new Error(err)

        done()
      })
  })

  it('Retrieves all users', done => {
    const url = '/users'

    request(server)
      .get(url)
      .expect(200)
      .end((err, res) => {
        if(err)
          throw new Error(err)

        assert.equal(res.body.length, 10)
        done()
      })

  })

  it('Updates an user', done => {
    const url = `/user/${aUser.id}`

    aUser.username = 'mynewusername'

    request(server)
      .put(url)
      .set('Accept','application/json')
      .send(aUser)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        assert.equal(res.body.username, 'mynewusername')
        done()
      })
  })

  it('Deletes an user', done => {
    const url = `/user/${aUser.id}`
    request(server)
      .delete(url)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        assert.equal(res.body.message, `User ${aUser.id} deleted`)
        done()
      })
  })

  it('Retrieves a user page', done => {
    const url = `/users/page/1`

    request(server)
      .get(url)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        assert.equal(10, res.body.length)
        done()

      })
  })

  it('Retrive the user´s count', done => {
    const url = '/users/count'

    request(server)
      .get(url)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        assert.equal(10, res.body.count)
        done()
      })
  })
})
