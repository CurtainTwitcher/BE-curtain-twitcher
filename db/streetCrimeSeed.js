const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const promisify = require('es6-promisify');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const dbURL = 'mongodb://localhost:27017/curtain_twitcher';
mongoose.connect(dbURL, {useMongoClient: true})
  .then(() => console.log(`Successfully connected to ${dbURL}`))
  .catch(err => console.log(`Connection failed: ${err}`));

const CRIME_STREET_PATH = path.join(__dirname, '../data/2017-08-street');
const StreetCrimeSchema = require('../models/streetCrime')

const readdir = promisify(fs.readdir);

readdir(CRIME_STREET_PATH)
  .then((files) => {
    // Go through each file
    // Seed the database 
    const fileCount = files.length;
    let currentCount = 0;
    files.forEach(file => {
      // Parse the CSV to JSON and save to array
      const streetCrimeData = [];
      csv
        .fromPath(`${CRIME_STREET_PATH}/${file}`, {
          headers: true
        })
        .on('data', (data) => {
          const crime = new StreetCrimeSchema({
            month: data.Month,
            reportedBy: data['Reported by'],
            longitude: data.Longitude,
            latitude: data.Latitude,
            location: data.Location,
            LSOAName: data['LSOA name'],
            crimeType: data['Crime type'],
            outcome: data['Last outcome category']
          }).save();
          streetCrimeData.push(crime);
        })
        .on('end', () => {
          // Save promises to mongoose db
          return Promise.all(streetCrimeData)
            .then(() => {
              ++currentCount;
              if (currentCount === fileCount) {
                console.log('DONE');
                mongoose.disconnect();
              }
            });
        });
    });
  });
