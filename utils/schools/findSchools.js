const OfstedSchool = require('../../models/OfstedSchool');

const findSchools = (lng, lat, maxDistance, phase) => {
  return OfstedSchool.find({
    phase: phase,
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], maxDistance]
      }
    }
  });
};

module.exports = findSchools;
