const findCrimeTrends = require('../utils/findCrimeTrends');

// coordinates must be LNG first, LAT second
const getCrimeTrends = (req, res, next) => {
  const { lng, lat } = req.query;
  const radius = 0.25;
  const earthRadius = 3959;
  let maxDistance = radius / earthRadius;
  findCrimeTrends(lng, lat, maxDistance)
    .then(crime => res.json(crime))
    .catch(err => next(err));
};

module.exports = getCrimeTrends;