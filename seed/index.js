const seedSchools = require('../utils/schools/parseSchools');
const getCoords = require('../utils/schools/getCoords');
const seedCrimes = require('./seedCrimes');

const mongoose = require('mongoose');
mongoose.Promise = Promise;
const { db } = require('../config');

mongoose.connect(db, {useMongoClient: true})
  .then(() => {
    console.log(`Successfully connected to ${dbURL}`);
    return seedCrimes();
  })
  .then((crimes) => {
    console.log(`Seeded ${crimes} crimes`);  
  })
  // .then(() => {
  //   seedSchools
  // })
  .then(() => mongoose.disconnect())
  .catch(err => console.log(`Connection failed: ${err}`));
