// const streetCrime = require('../models/streetCrime');
const findRecentCrimes = require('../utils/findRecentCrimes');

const getRecentCrimes = (req, res, next) => {
  const {lat, lng} = req.query;
  console.log(lat, lng);
  findRecentCrimes()
    .then(crime => res.send(crime))
    .catch(err => next(err));
};

module.exports = getRecentCrimes;