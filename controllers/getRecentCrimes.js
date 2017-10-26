const findRecentCrimes = require('../utils/findRecentCrimes');

// coordinates must be LNG first, LAT second
const getRecentCrimes = (req, res, next) => {
  const { lng, lat, month = '2017-08', dis = 0.25, type : crimeType = { $exists: true } } = req.query;
  let maxDistance = dis / 3959;
  console.log(lng, lat, month, maxDistance, crimeType);
  findRecentCrimes(lng, lat, month, maxDistance, crimeType)
    .then(crime => res.json(crime))
    .catch(err => next(err));
};

module.exports = getRecentCrimes;