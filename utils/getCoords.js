const _ = require('lodash');
const axios = require('axios');
const seedSchools = require('./seedSchools');

const getCoords = (schools, cb) => {
  const pcs = _.map(schools, 'Postcode');
  const chunked = _.chunk(pcs, 100);
  const chunkCount = chunked.length;
  let count = 0;
  let coords = [];
  _.each(chunked, (postcodes) => {
    axios
      .post('https://api.postcodes.io/postcodes?filter=postcode,longitude,latitude', {postcodes})
      .then(res => {
        ++count;
        coords = coords.concat(res.data.result);
        if (count === chunkCount) cb(schools, coords, seedSchools);
      })
      .catch(console.log);
  });
};

module.exports = getCoords;