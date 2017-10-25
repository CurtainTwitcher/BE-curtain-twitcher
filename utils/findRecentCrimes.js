const StreetCrime = require('../models/streetCrime');

const findRecentCrimes = (lng, lat, maxDistance) => {
  return StreetCrime.find({
    month: '2017-08',
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], maxDistance]
      }
    }
  });
};

module.exports = findRecentCrimes;