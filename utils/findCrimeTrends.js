const StreetCrime = require('../models/streetCrime');

const findCrimeTrends = (lng, lat, maxDistance) => {
  return StreetCrime.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], maxDistance]
      }
    }
  })
    .then( crimes => crimes
      .reduce((acc, crime) => {
        if (acc[0].date.includes(crime.month))
          acc[0].hasOwnProperty(crime.crimeType) ? acc[0][crime.crimeType] += 1 : acc[0][crime.crimeType] = 1;
        if (acc[1].date.includes(crime.month))
          acc[1].hasOwnProperty(crime.crimeType) ? acc[1][crime.crimeType] += 1 : acc[1][crime.crimeType] = 1;
        return acc;
      }, [{
        date: ['2017-06', '2017-07', '2017-08']
      }, {
        date: ['2017-03', '2017-04', '2017-05']
      }])
    );
};

module.exports = findCrimeTrends;