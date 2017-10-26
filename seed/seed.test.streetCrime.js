const jsonArr = require('../data/test/2017-08');
const StreetCrime = require('../models/streetCrime');

module.exports = () => {
  const crimes = jsonArr.map(crime => new StreetCrime(crime).save());
  return Promise.all(crimes)
    .then(savedCrimes => savedCrimes);
};

