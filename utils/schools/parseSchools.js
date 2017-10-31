const path = require('path');
const OFSTED_DATA_PATH = path.join(__dirname, '../../data/schools/ofstedSchoolData.csv');
const csv = require('fast-csv');

const parseSchools = () => {
  return new Promise((resolve, reject) => {
    const parsed = [];
    csv
      .fromPath(OFSTED_DATA_PATH, {
        headers: true
      })
      .on('data', (data) => {
        parsed.push(data);
      })
      .on('end', () => {
        resolve(parsed);
      })
      .on('error', reject);
  });
};

parseSchools()
  .then(console.log)
  .catch(console.error);

module.exports = parseSchools;
