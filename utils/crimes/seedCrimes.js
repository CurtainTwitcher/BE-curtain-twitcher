const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const promisify = require('es6-promisify');
const tidyCrime = require('./tidyCrime');

const CRIME_STREET_PATH = path.join(__dirname, '../../data/2017-08-street');
const StreetCrimeSchema = require('../../models/streetCrime');
const readdir = promisify(fs.readdir);

const seedCrimes = () => {
  return readdir(CRIME_STREET_PATH)
    .then((files) => {
  
      const fileCount = files.length;
      let currentCount = 0;
  
      return files.reduce((chain, file) => {
        return chain
          .then(() => {
            return new Promise((resolve, reject) => {
              let streetCrimeData = [];
              csv
                .fromPath(`${CRIME_STREET_PATH}/${file}`, { headers: true })
                .on('data', (data) => {
                  streetCrimeData.push(new StreetCrimeSchema(tidyCrime(data)).save());
                })
                .on('end', () => {
                  return Promise.all(streetCrimeData)
                    .then(() => {
                      streetCrimeData = null;
                      ++currentCount;
                      console.log('CLEARED STREET CRIME', streetCrimeData, currentCount);
                      if (currentCount === fileCount) {
                        console.log('DONE CRIMES');
                      }
                      resolve();
                    });
                });
            });
          });
      }, Promise.resolve());
    });
};

module.exports = seedCrimes;
