const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const async = require('async');
const tidyCrime = require('../utils/crimes/tidyCrime');

const CRIME_STREET_PATH = path.join(__dirname, '../data/2017-08-street');
const StreetCrime = require('../models/streetCrime');

function seedCrimes () {
  return new Promise((resolve, reject) => {
    const filenames = fs.readdirSync(CRIME_STREET_PATH)
      .filter(name => name !== '.DS_Store');
  
    let totalDocs = 0;
  
    async.eachSeries(filenames, function (filename, next) {
      const filePath = path.join(CRIME_STREET_PATH, filename);
      const crimes = [];
      csv.fromPath(filePath, {headers: true})
        .on('data', (data) => {
          crimes.push(new StreetCrime(tidyCrime(data)));
        })
        .on('end', () => {
          StreetCrime.insertMany(crimes, (err, docs) => {
            if (err) return next(err);
            console.info(`Inserted ${docs.length} documents`);
            totalDocs += docs.length;
            next();
          });
        });
    }, (err) => {
      if (err) return reject(err);
      resolve(totalDocs);
    });
  });
}

module.exports = seedCrimes;
