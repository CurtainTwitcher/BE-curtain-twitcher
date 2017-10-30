const findRecentCrimes = require('../utils/crimes/findRecentCrimes');

// coordinates must be LNG first, LAT second
const getRecentCrimes = (req, res, next) => {
  const { lng, lat, month = '2017-08', dis : radius = 0.25, type : crimeType = { $exists: true } } = req.query;
  if (!lng || !lat) return res.status(404).send({msg: 'please provide longitude and latitude'});
  const earthRadius = 3959;
  let maxDistance = radius / earthRadius;
  findRecentCrimes(lng, lat, month, maxDistance, crimeType)
    .then(crime => res.send(crime))
    .catch(err => next(err));
};

module.exports = getRecentCrimes;
