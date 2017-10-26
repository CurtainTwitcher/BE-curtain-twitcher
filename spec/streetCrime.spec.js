process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const {PORT, db} = require('../config');
mongoose.Promise = Promise;
const { expect } = require('chai');
const request = require('supertest');
const saveTestData = require('../seed/testStreetCrime');
const app = require('../server');

const streetCrime = require('../models/streetCrime');


describe('API', () => {
  let usefulData;
  beforeEach(() => {
    console.log(('running'));
    return mongoose.connect(`mongodb://${db.host}:${db.port}/${db.database}`, {useMongoClient: true})
      .dropDatabase()
      .then(saveTestData)
      .then(data => {
        console.log(`saved to ${db.database} on port ${db.PORT}`);
        usefulData = data;
      })
      .catch(err => console.log(err));
  }
  );
  describe('GET /crimes', () => {
    it('sends back the correct object with 200 status code', () => {
      return request(app)
        .get('/api/crimes?lng=-2.207582&lat=53.458131')
        .expect(200)
        .then(res => {
          console.log('•••••8••••••••••8', res.body[0]);
          expect(res.body[0]).to.be.an('object');
          mongoose.disconnect();
        });
    });
  });
});