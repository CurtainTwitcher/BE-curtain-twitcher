require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = Promise;

const seedSchools = require('./seedSchools');
const seedCrimes = require('./seedCrimes');

const {DB_URL} = process.env;

mongoose.connect(DB_URL, {useMongoClient: true})
  .then(() => {
    console.log(`Successfully connected to ${DB_URL}`);
    return seedCrimes();
  })
  .then((crimes) => {
    console.log(`Seeded ${crimes} crimes`);  
  })
  .then(() => {
    return seedSchools();
  })
  .then(insertedSchools => {
    console.log(`Inserted ${insertedSchools} schools`);
  })
  .then(() => mongoose.disconnect())
  .then(() => console.log('Disconnected from DB'))
  .catch(console.error);
