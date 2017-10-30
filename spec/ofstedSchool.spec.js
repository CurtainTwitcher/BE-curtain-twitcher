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
    it('returns the correct object with 200 status code', () => {
      return request(app)
        .get('/api/schools')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body[0]).to.be.an('object');
          mongoose.disconnect();
        });
    });
  });
});