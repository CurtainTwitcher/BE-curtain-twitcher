const findSchools = require('../utils/schools/findSchools');

// coordinates must be LNG first, LAT second
const getSchools = (req, res, next) => {
  const { lng, lat, dis : radius = 1, phase = { $exists: true }} = req.query;
  if (!lng || !lat) return res.status(404).send({msg: 'please provide longitude and latitude'});
  const earthRadius = 3959;
  let maxDistance = radius / earthRadius;
  return findSchools(lng, lat, maxDistance, phase)
    .then(schools => res.send(schools))
    .catch(err => next(err));
};

module.exports = getSchools;