const _ = require('lodash');

const reduceCoords = (schools, coords, cb) => {
  const reduced = {};
  let count = 0;
  const truthyCoords = _.filter(coords, (coord) => coord.result);
  _.each(truthyCoords, coord => {
    const {postcode, longitude, latitude} = coord.result;
    reduced[postcode] = [longitude, latitude] || null;
    ++count;
    if (count === truthyCoords.length) cb(schools, reduced);
  });
};

module.exports = reduceCoords;