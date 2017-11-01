const path = require('path');

const OfstedSchool = require('../models/OfstedSchool');
const {parseSchools, getCoords, reduceCoords, tidySchool} = require('./helpers');

const OFSTED_DATA_PATH = path.join(__dirname, '../data/schools/ofstedSchoolData.csv');

const seedSchools = () => {
  let schools;
  parseSchools(OFSTED_DATA_PATH)
    .then(parsedSchools => {
      schools = parsedSchools;
      return getCoords(schools);
    })
    .then(reduceCoords)
    .then((coords) => {
      return schools.map(school => tidySchool(school, coords));
    })
    .then(schools => {
      const docs = schools.map(s => new OfstedSchool(s));
      return OfstedSchool.insertMany(docs);
    });
};

module.exports = seedSchools;
