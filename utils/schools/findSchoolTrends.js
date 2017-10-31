const OfstedSchool = require('../../models/OfstedSchool');

const findSchoolTrends = (lng, lat, maxDistance) => {
  return OfstedSchool.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], maxDistance]
      }
    }
  })
    .then(schools => schools
      .reduce((acc, school) => {
        const {name, inspectionDate, prevInspectionDate, totalScore, prevTotalScore} = school;
        const currDate = inspectionDate.slice(-4);
        const prevDate = prevInspectionDate.slice(-4);
        const trend = {};

        if (currDate !== 'NULL' && totalScore !== 'NULL') trend[currDate] = totalScore;
        if (prevDate !== 'NULL' && prevTotalScore !== 'NULL') trend[prevDate] = prevTotalScore;
        trend.name = name;

        acc.push(trend);
        return acc;
      }, []));
};

module.exports = findSchoolTrends;