// const streetCrime = require('../models/streetCrime');
const findRecentCrimes = require('../utils/findRecentCrimes');

// coordinates must be LNG first, LAT second
const getRecentCrimes = (req, res, next) => {
  const {lng, lat, limit = 10, distance = 0.2} = req.query;
  let maxDistance = distance / 3959;
  console.log(lng, lat, limit);
  findRecentCrimes(lng, lat, maxDistance)
    .then(crime => res.json(crime))
    .catch(err => next(err));
};

module.exports = getRecentCrimes;