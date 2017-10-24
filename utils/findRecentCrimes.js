const StreetCrime = require('../models/streetCrime');

const findRecentCrimes = () => StreetCrime.findOne();

module.exports = findRecentCrimes;