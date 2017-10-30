const OfstedSchool = require('../models/OfstedSchool');

const findSchools = () => {
  return OfstedSchool.find();
};

module.exports = findSchools;
