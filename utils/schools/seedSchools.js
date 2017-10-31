const path = require('path');
const csv = require('fast-csv');
const _ = require('lodash');
const axios = require('axios');

const OfstedSchool = require('../../models/OfstedSchool');
const tidySchool = require('./tidySchool');

const OFSTED_DATA_PATH = path.join(__dirname, '../../data/schools/ofstedSchoolData.csv');



parseSchools()
  .then(getCoords)
  .then(result => {
    console.log(result)
  })
  .catch(console.error);



const seedSchools = (schools, coords) => {
  const promises = schools
  .map(school => new OfstedSchool(tidySchool(school, coords)).save());
  return Promise.all(promises);
};

module.exports = seedSchools;


function parseSchools () {
  return new Promise((resolve, reject) => {
    const parsedSchools = [];
    csv
      .fromPath(OFSTED_DATA_PATH, {
        headers: true
      })
      .on('data', (data) => {
        parsedSchools.push(data);
      })
      .on('end', () => {
        resolve(parsedSchools);
      })
      .on('error', reject);
  });
}

function getCoords (schools) {
  const pcs = _.map(schools, 'Postcode');
  const chunked = _.chunk(pcs, 100);
  const postPromises = chunked.map(postcodes => {
    return axios
      .post('https://api.postcodes.io/postcodes?filter=postcode,longitude,latitude', {postcodes});
  });
  return Promise.all(postPromises)
    .then(responses => {
      return _.flatten(responses.map(res => res.data.result));
    })
    .then((coords) => {
      return coords.reduce((acc, coord) => {
        if (!coord.result) return acc;
    
        const {postcode, longitude, latitude} = coord.result;
        acc[postcode] = [longitude, latitude];
        return acc;
      }, {});
    });
}
