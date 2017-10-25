const StreetCrime = require('../models/streetCrime');

const findRecentCrimes = (lng, lat, month, maxDistance, crimeType) => {
  return StreetCrime.find({
    month: month,
    crimeType: crimeType,
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], maxDistance]
      }
    }
  });
};

module.exports = findRecentCrimes;