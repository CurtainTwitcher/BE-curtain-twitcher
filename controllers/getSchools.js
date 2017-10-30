const findSchools = require('../utils/findSchools');

// coordinates must be LNG first, LAT second
const getSchools = (req, res, next) => {
  const { lng, lat, dis : radius = 5 } = req.query;
  if (!lng || !lat) return res.status(404).send({msg: 'incorrect request'});
  const earthRadius = 3959;
  let maxDistance = radius / earthRadius;
  return findSchools(lng, lat, maxDistance)
    .then(schools => res.send(schools))
    .catch(err => next(err));
};

module.exports = getSchools;