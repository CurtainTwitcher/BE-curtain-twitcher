const seedSchools = require('../utils/schools/parseSchools');
const getCoords = require('../utils/schools/getCoords');
const seedCrimes = require('../utils/crimes/seedCrimes');

const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { db } = require('../config');

mongoose.connect(db, {useMongoClient: true})
  .then(() => {
    console.log(`Successfully connected to ${db}`);
    return Promise.all([ seedCrimes(), seedSchools(getCoords)]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => console.log(`Connection failed: ${err}`));