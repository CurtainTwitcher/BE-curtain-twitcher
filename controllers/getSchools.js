const findSchools = require('../utils/findSchools');

// coordinates must be LNG first, LAT second
const getSchools = (req, res, next) => {
  return findSchools()
    .then(schools => res.send(schools))
    .catch(err => next(err));
};

module.exports = getSchools;