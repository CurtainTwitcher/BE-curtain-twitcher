const OfstedSchool = require('../models/OfstedSchool');

const findSchools = (lng, lat, maxDistance) => {
  return OfstedSchool.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], maxDistance]
      }
    }
  });
};

module.exports = findSchools;
