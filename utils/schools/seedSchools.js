const OfstedSchool = require('../../models/OfstedSchool');
const tidySchool = require('./tidySchool');

const seedSchools = (schools, coords) => {
  const promises = schools
    .map(school => new OfstedSchool(tidySchool(school, coords)).save());
  return Promise.all(promises);
};

module.exports = seedSchools;
 
