process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const { db } = require('../config');
mongoose.Promise = Promise;
const { expect } = require('chai');
const request = require('supertest');
const saveTestData = require('../seed/seed.test.ofstedSchool');
const app = require('../server');

describe('API', () => {
  let usefulData;
  beforeEach(() => {
    return mongoose.connect(`mongodb://${db.host}:${db.port}/${db.database}`, { useMongoClient: true })
      .dropDatabase()
      .then(saveTestData)
      .then(data => {
        usefulData = data;
      })
      .catch(err => console.log(err));
  });
  describe('GET /schools', () => {
    it('sends the correct object with 200 status code', () => {
      return request(app)
        .get('/api/schools?lng=-1.73499676924206&lat=53.8074122035828')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body[0]).to.be.an('object');
          mongoose.disconnect();
        });
    });
    it('sends data for correct area using lng/lat coords', () => {
      return request(app)
        .get('/api/schools?lng=-1.73499676924206&lat=53.8074122035828')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.length).to.equal(1);
          mongoose.disconnect();
        });
    });
    it('sends back a 404 when given invalid id', () => {
      return request(app)
        .get('/api/schools')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('incorrect request');
        });
    });
    it('sends data for correct area using school phase', () => {
      return request(app)
        .get('/api/schools?lng=-1.73499676924206&lat=53.8074122035828&phase=Primary')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.length).to.equal(1);
          mongoose.disconnect();
        });
    });
  });
});