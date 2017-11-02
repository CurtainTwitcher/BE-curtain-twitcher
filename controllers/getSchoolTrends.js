const findSchoolTrends = require('../utils/schools/findSchoolTrends');

const getSchoolTrends = (req, res, next) => {
  const {lng, lat} = req.query;
  const radius = 1;
  const earthRadius = 3959;
  const maxDistance = radius / earthRadius;
  findSchoolTrends(lng, lat, maxDistance)
    .then(school => res.send(school))
    .catch(err => next(err));
};

module.exports = getSchoolTrends;