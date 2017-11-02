const path = require('path');

const OfstedSchool = require('../models/OfstedSchool');
const {parseSchools, getCoords, reduceCoords, tidySchool} = require('./helpers');

const OFSTED_DATA_PATH = path.join(__dirname, '../data/schools/ofstedSchoolData.csv');

const seedSchools = () => {
  let schools;
  console.log('Seeding schools...');
  return parseSchools(OFSTED_DATA_PATH)
    .then(parsedSchools => {
      schools = parsedSchools;
      console.log(`Parsed ${schools.length} schools`);
      return getCoords(schools);
    })
    .then(reduceCoords)
    .then((coords) => {
      console.log(`Reduced ${Object.keys(coords).length} coords`);
      return schools.map(school => tidySchool(school, coords));
    })
    .then(schools => {
      const docs = schools.map(s => new OfstedSchool(s));
      console.log(`Saving ${schools.length} schools`);
      return OfstedSchool.insertMany(docs);
    });
};

module.exports = seedSchools;
