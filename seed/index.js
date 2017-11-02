const mongoose = require('mongoose');
mongoose.Promise = Promise;

const seedSchools = require('./seedSchools');
const seedCrimes = require('./seedCrimes');

const { db } = require('../config');

mongoose.connect(db, {useMongoClient: true})
  .then(() => {
    return console.log(`Successfully connected to ${db}`);
  })
  .then(() => {
    return seedCrimes();
  })
  .then((crimes) => {
    return console.log(`Seeded ${crimes} crimes`);  
  })
  .then(() => {
    return seedSchools();
  })
  .then(insertedSchools => {
    return console.log(`Inserted ${insertedSchools.length} schools`);
  })
  .then(() => mongoose.disconnect())
  .then(() => console.log('Disconnected from DB'))
  .catch(console.error);
