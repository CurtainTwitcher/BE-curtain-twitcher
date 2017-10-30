const path = require('path');
const OFSTED_DATA_PATH = path.join(__dirname, '../data/schools/ofstedSchoolData.csv');
const csv = require('fast-csv');
const reduceCoords = require('./reduceCoords');

const parseSchools = (cb) => {
  const parsed = [];
  return csv
    .fromPath(OFSTED_DATA_PATH, {
      headers: true
    })
    .on('data', (data) => {
      parsed.push(data);
    })
    .on('end', () => {
      cb(parsed, reduceCoords);
    });
};

module.exports = parseSchools;