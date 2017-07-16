const db = require('../models'),
  faker = require('faker')
  

function populateDatabase() {
  return new Promise((resolve, reject) => {

    db.sequelize.sync({force: true}).then(() => { 
      addUsers()
        .then(users => addCollections(users))
        .then(collections => addWritters())
        .then(() => addArtists())
        .then(() => addComics())
        .then(comics => {
          let promises = []
          promises.push(bindArtists(comics))
          promises.push(bindWritters(comics))
          promises.push(bindCollection(comics))
          promises.push(bindUser(comics))

          Promise.all(promises)
            .then(() => resolve())
            .catch(err => reject(err))
        })
    })
  })
}

function addUsers() {
  return new Promise((resolve, reject) => {
    let promises = []
    for(let i = 0; i < 10; i++) {
      const user = {
        fullname: faker.name.findName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email()
      }

      const create = db.User.create(user)
      promises.push(create)
    }

    Promise.all(promises).then(users => {
      return resolve(users)
    }).catch(err => {
      return reject(err)
    })


  })
}

function addCollections(users) {
  return new Promise((resolve, reject) => {
    let promises = []
    users.forEach(user => {
      for(let i = 0; i < 10; i++) {
        let collection = {
          title: faker.lorem.words(),
          bundleSize: faker.random.number(),
          user_id: user.id
        }

        let create = db.Collection.create(collection)
        promises.push(create)
      }
    })

    Promise.all(promises).then(collections => {
      return resolve(collections)
    }).catch(err => {
      return reject(err)
    })
  })
}

function addWritters() {
  return new Promise((resolve, reject) => {
    let promises = []
    for(let i = 0; i < 10; i++) {
      let writter = {
        fullname: faker.name.findName(),
        profilePicUrl: faker.image.imageUrl()
      }

      let create = db.Writter.create(writter)
      promises.push(create)
    }

    Promise.all(promises).then(writters => {
      return resolve(writters)
    }).catch(err => {
      return reject(err)
    })
  })
}

function addArtists() {
  return new Promise((resolve, reject) => {
    let promises = []
    for(let i = 0; i< 10; i++) {
      let artist = {
        fullname: faker.name.findName(),
        profilePicUrl: faker.image.imageUrl()
      }

      let create = db.Artist.create(artist)
      promises.push(artist)
    }

    Promise.all(promises).then(artists => {
      return resolve(artists)
    }).catch(err => {
      return reject(err)
    })
  })
}

function addComics() {
  return new Promise((resolve, reject) => {
    let promises = []
    for(let i = 0; i < 10; i++) {
      let comic = {
        title: faker.lorem.words(),
        subtitle: faker.lorem.words(),
        pages: faker.random.number(),
        collectionOrder: faker.random.number()
      }

      let create = db.Comic.create(comic)
      promises.push(create)
    }

    Promise.all(promises)
      .then(comics => resolve(comics))
      .catch(err => reject(err))
  })
}

function bindArtists(comics) {
  return new Promise((resolve, reject) => {
    db.Artist.findAll().then(artists => {
      let promises = []
      comics.forEach(comic => {
        const artists_number = faker.random.number({min: 1, max: 3})
        let nots = []
        for(let i = 0; i < artists_number; i++) {
          const index = faker.random.number({min: 0, max: 9})

          if(nots.indexOf(index) == -1) {
            promises.push(comic.addArtist(artists[index]))
            nots.push(index)
          } else {
            continue
          }
        }
  
      })

      Promise.all(promises).then(() => resolve())
        .catch(err => reject(err))
    })

  })
}

function bindWritters(comics) {
  return new Promise((resolve, reject) => {
    db.Writter.findAll().then(writters => {
      let promises = []
      comics.forEach(comic => {
        const writters_number = faker.random.number({min: 1, max: 3})
        let nots = []
        for(let i = 0; i < writters_number; i++) {
          const index = faker.random.number({min: 0, max: 9})

          if(nots.indexOf(index) == -1) {
            promises.push(comic.addWritter(writters[index]))
            nots.push(index)
          } else {
            continue
          }
        }

      })

      Promise.all(promises).then(() => resolve())
        .catch(err => reject(err))
    })

  })

}

function bindCollection(comics) {
  return new Promise((resolve, reject) => {
    db.Collection.findAll().then(collections => {
      let promises = comics.map(comic => {
        const index = faker.random.number({min: 0, max: 9})
        return comic.setCollection(collections[index])
      })

      Promise.all(promises).then(() => resolve())
        .catch(err => reject(err))

    })
  })
}

function bindUser(comics) {
  return new Promise((resolve, reject) => {
    db.User.findAll().then(users => {
      let promises = comics.map(comic => {
        const index = faker.random.number({min: 0, max: 9})
        return comic.setUser(users[index])
      })

      Promise.all(promises).then(() => resolve())
        .catch(err => reject(err))

    })
  })
}

module.exports = populateDatabase

