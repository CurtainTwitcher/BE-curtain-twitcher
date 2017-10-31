const findCrimeTrends = require('../utils/crimes/findCrimeTrends');

// coordinates must be LNG first, LAT second
const getCrimeTrends = (req, res, next) => {
  const { lng, lat } = req.query;
  const radius = 0.25;
  const earthRadius = 3959;
  const maxDistance = radius / earthRadius;
  findCrimeTrends(lng, lat, maxDistance)
    .then(crime => res.send(crime))
    .catch(err => next(err));
};

module.exports = getCrimeTrends;