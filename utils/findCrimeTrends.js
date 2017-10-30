const StreetCrime = require('../models/streetCrime');
const crimeTypes = require('./crimeTypes');
const months = require('./months');

const findCrimeTrends = (lng, lat, maxDistance) => {
  return StreetCrime.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], maxDistance]
      }
    }
  })
    .then( crimes =>  {
      const accumulator = Object.keys(crimeTypes)
        .reduce((acc, crimeType) => {
          acc.push({ name: crimeType });
          return acc;
        }, []); 
      return crimes
        .reduce((acc, crime) => {
          if (crimeTypes.hasOwnProperty(crime.crimeType)) {
            acc[crimeTypes[crime.crimeType]].hasOwnProperty(months[crime.month])
              ? acc[crimeTypes[crime.crimeType]][months[crime.month]] += 1
              : acc[crimeTypes[crime.crimeType]][months[crime.month]] = 1;
          }
          return acc;
        }, accumulator);
    });
};

module.exports = findCrimeTrends;
