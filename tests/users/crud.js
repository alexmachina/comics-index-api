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
        for(let i = 0; i < 0; i++) {
          const user = {
            fullname: faker.name.findName(),
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: faker.internet.password()
          }

          promises.push(UserModel.build(user).save())
        }

        Promise.all(promises).then(results => {
          done()
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

  })
})
