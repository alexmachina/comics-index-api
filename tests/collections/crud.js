const assert = require('chai').assert,
  request = require('supertest'),
  server = require('../../index'),
  CollectionModel = require('../../models').Collection,
  models = require('../../models'),
  UserModel = models.User,
  faker = require('faker'),
  populateDatabase = require('../../helpers/populateDatabase')


describe('Collections', () => {
  let aUser = null
  let aCollection = null
  let token = null
  before(done => {

    populateDatabase().then(() => {
      const userId = faker.random.number({min: 1, max: 10}),
        collectionId = userId

      let promises = []
      promises.push(UserModel.findById(userId))
      promises.push(CollectionModel.findById(collectionId))

      Promise.all(promises)
        .then(results => {
          [aUser, aCollection] = results

          aCollection.getUser().then(user => {
            aCollection.User = user
          })

          request(server)
            .post('/login')
            .send({username: aUser.username, password: aUser.password})
            .end((err, res) => {
              token = res.body.token
              done()
            })
        })
        .catch(err => {
          throw new Error(err)
        })

      
    })
  })


  it('Inserts a Collection', done => {
    const url = '/collection',
      collection = {
        title: faker.lorem.words(),
        bundleSize: faker.random.number(),
        user_id: aUser.id
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

  it('Retrieves a Collection', done => {
    const url = `/collection/${aCollection.id}`

    request(server)
      .get(url)
      .set('authorization', token)
      .expect(200)
      .end((err, res) => {
        if(err)
          throw new Error(err)

        const retrievedCollection = res.body

        assert.equal(retrievedCollection.title, aCollection.title)
        console.log(retrievedCollection)
        done()
      })
  })

  it('Rertrieves a Collection`s User', done => {
    const url = `/collection/${aCollection.id}/user`

    request(server)
      .get(url)
      .set('authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err)
            throw new Error(err)

        const retrievedUser = res.body
        assert.equal(aCollection.User.fullname, retrievedUser.fullname)
        done()
      })
  })

  it('Updates a Collection', done => {
    const url = `/collection/${aCollection.id}`

    request(server)
      .put(url)
      .set('authorization', token)
      .send({title: 'new title'})
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        const updatedCollection = res.body

        assert.equal(200, res.status)
        assert.equal('new title', updatedCollection.title)
        done()
        
      })
  })

  it('Retrieves a collection`s comics', done => {
    const url = `/collection/${aCollection.id}/comics`

    request(server)
      .get(url)
      .set('authorization', token)
      .end((err, res) => {
        if (err) 
          throw new Error(err)

        const comics = res.body

        assert.isArray(comics)
        assert.property(comics[0], 'title')
        done()


      })
  })
  it('Deletes a Collection', done => {
    const url = `/collection/${aCollection.id}`

    request(server)
      .delete(url)
      .set('authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err)
          throw new Error(err)

        assert(res.body.message, `Collection ${aCollection.id} deleted`)
        done()
      })
  })







})

