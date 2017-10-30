const mongoose = require('mongoose');
mongoose.Promise = Promise;
const dbURL = 'mongodb://localhost:27017/curtain_twitcher';
const OfstedSchool = require('../models/OfstedSchool');
const tidySchool = require('./tidySchool');

mongoose.connect(dbURL, {useMongoClient: true})
  .then(() => console.log(`Successfully connected to ${dbURL}`))
  .catch(err => console.log(`Connection failed: ${err}`));

const seedSchools = (schools, coords) => {
  const promises = schools
    .map(school => new OfstedSchool(tidySchool(school, coords)).save());
  return Promise.all(promises)
    .then(() => {
      console.log('DONE');
      mongoose.disconnect();
    })
    .catch(console.log);
};

module.exports = seedSchools;
 
