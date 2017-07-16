const assert = require('chai').assert,
  request = require('supertest'),
  server = require('../../index'),
  UserModel = require('../../models').User,
  CollectionModel = require('../../models').Collection
  Sequelize = require('sequelize'),
  models = require('../../models')
  fs = require('fs'),
  faker = require('faker')
require('dotenv').config()


describe('CRUD Operations on Users', () => {
  let sequelize = null
  let aUser = {}
  let token = null
  beforeEach(done => { promises = []
    models.sequelize.sync({force: true}).then( () => {
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

        request(server)
          .post('/login')
          .send({username: aUser.username, password: aUser.password})
          .set('Accept','application/json')
          .end((err, res) => {
            if (err)
              throw new Error(err)

            token = res.body.token
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
      .set('authorization', token)
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
      .set('authorization', token)
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
      .set('authorization', token)
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


  it('Retrieves a user page', done => {
    const url = `/users/page/1`

    request(server)
      .get(url)
      .set('authorization', token)
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
      .set('authorization',token)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        assert.equal(10, res.body.count)
        done()
      })
  })

  it('Retrieve a user´s comics', done => {
    const url = `/user/${aUser.id}/comics`

    request(server)
      .get(url)
      .set('authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        const comics = res.body

        assert.isArray(comics)
        assert.property(comics[0], 'title')
        done()
      })
  })

  it('Retrieve a user`s collections', done => {
    const url = `/user/${aUser.id}/collections`

    request(server)
      .get(url) 
      .set('authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)
        const collections = res.body

        assert.isArray(collections)
        assert.property(collections[0], 'title')
        assert.property(collections[0], 'bundleSize')
        done()
      })
  })
  
  it('Deletes an user', done => {
    const url = `/user/${aUser.id}`
    request(server)
      .delete(url)
      .set('authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        assert.equal(res.body.message, `User ${aUser.id} deleted`)
        done()
      })
  })

})
