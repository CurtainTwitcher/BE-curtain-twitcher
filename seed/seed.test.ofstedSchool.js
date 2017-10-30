const OfstedSchools = require('../models/OfstedSchool');
const schoolData = require('../data/test/ofstedSchool.test');

module.exports = () => {
  const schools = schoolData.map(school => new OfstedSchools(school).save());
  return Promise.all(schools)
    .then(savedSchools => savedSchools);
};