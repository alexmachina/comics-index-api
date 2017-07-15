const assert = require('chai').assert,
  request = require('supertest'),
  server = require('../../index'),
  CollectionModel = require('../../models').Collection,
  models = require('../../models'),
  UserModel = models.User,
  faker = require('faker')


describe('Collections', () => {
  let aUser = null
  let token = null
  beforeEach(done => {

    models.sequelize.sync({force: true}).then(function() {

      const user = {
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password()
      }

      UserModel.create(user).then(user => {
        aUser = user
        let operations = []
        for(let i = 0;i < 10; i++) {
          const collection = {
            title: faker.lorem.words(),
            bundleSize: faker.random.number(),
            userId: user.id
          }

          const save = CollectionModel.build(collection).save()

          operations.push(save)

        }

        Promise.all(operations).then(results => {
          request(server)
            .post('/login')
            .set('accept', 'application/json')
            .send({username: user.username, password: user.password})
            .expect(200)
            .end((err, res) => {
              token = res.body.token
              done()
            })
        }).catch(err => {
          console.log(err)
          throw new Error(err)
        })

      });

    })
  })

  it('Inserts a Collection', done => {
    const url = '/collection',
      collection = {
        title: faker.lorem.words(),
        bundleSize: faker.random.number(),
        userId: aUser.id
      }

    request(server)
      .post(url)
      .set('Accept','application/json')
      .set('authorization', token)
      .send(collection)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        const newCollection = res.body
        assert.equal(collection.title, newCollection.title)

        done()


      })
  })

  



})

