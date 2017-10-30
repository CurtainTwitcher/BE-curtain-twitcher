const seedSchools = require('../utils/schools/parseSchools');
const getCoords = require('../utils/schools/getCoords');
const seedCrimes = require('../utils/crimes/seedCrimes');

const mongoose = require('mongoose');
mongoose.Promise = Promise;
const dbURL = 'mongodb://localhost:27017/curtain_twitcher';

mongoose.connect(dbURL, {useMongoClient: true})
  .then(() => {
    console.log(`Successfully connected to ${dbURL}`);
    return Promise.all([ seedCrimes(), seedSchools(getCoords)]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => console.log(`Connection failed: ${err}`));