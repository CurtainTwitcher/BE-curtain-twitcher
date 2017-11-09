process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const saveTestData = require('../seed/seed.test.ofstedSchool');
const app = require('../server');

describe('API', () => {
  beforeEach(() => {
    return mongoose.connection
      .dropDatabase()
      .then(saveTestData)
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
        });
    });
    it('sends data for correct area using lng/lat coords', () => {
      return request(app)
        .get('/api/schools?lng=-1.73499676924206&lat=53.8074122035828')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.length).to.equal(1);
        });
    });
    it('sends back a 404 when given invalid id', () => {
      return request(app)
        .get('/api/schools')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('please provide longitude and latitude');
        });
    });
    it('sends data for correct area using school phase', () => {
      return request(app)
        .get('/api/schools?lng=-1.73499676924206&lat=53.8074122035828&phase=Primary')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.length).to.equal(1);
        });
    });
  });
  describe('GET /schools/trends', () => {
    it('sends back school trend data', () => {
      return request(app)
        .get('/api/schools/trends?lng=-1.73499676924206&lat=53.8074122035828')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.length).to.equal(1);
        });
    });
    it('sends back an array of objects', () => {
      return request(app)
        .get('/api/schools/trends?lng=-1.73499676924206&lat=53.8074122035828')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.be.an('object');
        });
    });
    it('sends back the performance scores for each school', () => {
      return request(app)
        .get('/api/schools/trends?lng=-1.73499676924206&lat=53.8074122035828')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body[0].name).to.equal('Peel Park Primary School and Nursery');
          expect(res.body[0]['2014']).to.equal('3');
        });
    });
  });
});