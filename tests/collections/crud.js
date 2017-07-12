const assert = require('chai').assert,
  request = require('supertest'),
  server = require('../../index'),
  CollectionModel = require('../../models').Collection,
  models = require('../../models'),
  UserModel = models.User,
  faker = require('faker')


describe('Collections', () => {
  beforeEach(done => {
    aCollection = null

    models.sequelize.sync({force: true}).then(function() {
      const user = {
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password()
      }

      UserModel.create(user).then(user => {
        console.log(user.id)
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
          done()
          }).catch(err => {
          console.log(err)
          throw new Error(err)
        })

      });

    })
  })

  it('Inserts a Collection', done => {
    done()
  })


})

