const server = require('../../index.js')
const request = require('supertest')
const assert = require('chai').assert


describe('Server', () => {
  it('It gets online', done => {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if(err)
          throw new Error(err)
        
        done()
      })
  })

    it('protects a secure URL', done => {
      request(server)
        .get('/secureRoute')
        .expect(403)
        .end((err, res) => {
          if(err)
            throw new Error(err)

          assert.equal(res.body.message, 'No token!')
          done()

        })
    })
  })

