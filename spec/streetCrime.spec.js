process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const saveTestData = require('../seed/seed.test.streetCrime');
const app = require('../server');

describe('API', () => {
  let usefulData;
  beforeEach(() => {
    return mongoose.connection
      .dropDatabase()
      .then(saveTestData)
      .then(data => {
        usefulData = data;
      })
      .catch(err => console.log(err));
  });
  describe('GET /crimes', () => {
    it('sends back the correct object with 200 status code', () => {
      return request(app)
        .get('/api/crimes?lng=-2.207582&lat=53.458131')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body[0]).to.be.an('object');
        });
    });
    it('sends back data for specified crime types', () => {
      return request(app)
        .get('/api/crimes?lng=-2.207582&lat=53.458131&type=Burglary')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.length).to.equal(1);
        });
    });
    it('sends back data for correct month', () => {
      return request(app)
        .get('/api/crimes?lng=-2.207582&lat=53.458131&month=2017-07')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.length).to.equal(0);
        });
    });
    it('sends back data for correct radius', () => {
      return request(app)
        .get('/api/crimes?lng=-2.207582&lat=53.458131&dis=1')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.length).to.equal(10);
        });
    });
    it('sends back a 404 when given an invalid url request', () => {
      return request(app)
        .get('/api/crimes')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('please provide longitude and latitude');
        });
    });
  });
  describe('GET /crimes/trends', () => {
    it('sends back trends statistics', () => {
      return request(app)
        .get('/api/crimes/trends?lng=-2.207582&lat=53.458131')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.length).to.equal(14);
        });
    });
    it('sends back an array of objects', () => {
      return request(app)
        .get('/api/crimes/trends?lng=-2.207582&lat=53.458131')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.be.an('object');
          expect(res.body[1]).to.be.an('object');
        });
    });
    it('sends back a count of each crime type', () => {
      return request(app)
        .get('/api/crimes/trends?lng=-2.207582&lat=53.458131')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body[0].name).to.equal('Criminal damage and arson');
          expect(res.body[1]['Aug 2017']).to.equal(4);
        });
    });
  });
});