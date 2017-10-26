const StreetCrime = require('../models/streetCrime');

const findCrimeTrends = (lng, lat, maxDistance) => {
  return StreetCrime.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], maxDistance]
      }
    }
  })
    .then( crimes =>  {
      const months = { '2017-03': 0, '2017-04': 1, '2017-05':  2, '2017-06': 3,'2017-07': 4, '2017-08': 5 };
      return crimes
        .reduce((acc, crime) => {
          if (months.hasOwnProperty(crime.month)) {
            acc[months[crime.month]].hasOwnProperty(crime.crimeType)
              ? acc[months[crime.month]][crime.crimeType] += 1
              : acc[months[crime.month]][crime.crimeType] = 1;
          }
          return acc;
        }, [
          { month: 'Mar 2017' }, { month: 'Apr 2017' }, { month: 'May 2017' }, { month: 'Jun 2017' }, { month: 'Jul 2017' }, { month: 'Aug 2017' }
        ]);
    });
};

module.exports = findCrimeTrends;

// if (acc[0].date.includes(crime.month))
// acc[0].hasOwnProperty(crime.crimeType) ? acc[0][crime.crimeType] += 1 : acc[0][crime.crimeType] = 1;
// if (acc[1].date.includes(crime.month))
// acc[1].hasOwnProperty(crime.crimeType) ? acc[1][crime.crimeType] += 1 : acc[1][crime.crimeType] = 1;