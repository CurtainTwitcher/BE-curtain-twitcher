const csv = require('fast-csv');
const _ = require('lodash');
const axios = require('axios');

const parseSchools = (data_path) => {
  return new Promise((resolve, reject) => {
    const parsedSchools = [];
    csv
      .fromPath(data_path, {
        headers: true
      })
      .on('data', (data) => {
        parsedSchools.push(data);
      })
      .on('end', () => {
        resolve(parsedSchools);
      })
      .on('error', reject);
  });
};

const getCoords = (schools) => {
  const pcs = _.map(schools, 'Postcode');
  const chunked = _.chunk(pcs, 100);
  const postPromises = chunked.map(postcodes => {
    return axios
      .post('https://api.postcodes.io/postcodes?filter=postcode,longitude,latitude', {postcodes});
  });
  return Promise.all(postPromises)
    .then(responses => {
      return _.flatten(responses.map(res => res.data.result));
    });
};

const reduceCoords = (coords) => {
  return coords.reduce((acc, coord) => {
    if (!coord.result) return acc;

    const {postcode, longitude, latitude} = coord.result;
    acc[postcode] = [longitude, latitude];
    return acc;
  }, {});
};

const tidySchool = (school, coords) => ({
  URN: school['URN'],
  LAESTAB: school['LAESTAB'],
  name: school['School name'],
  phase: school['Ofsted phase'],
  type: school['Type of education'],
  sixthForm: school['Sixth form'],
  religion: school['Designated religious character'],
  localAuth: school['Local authority'],
  postcode: school['Postcode'],
  location: {
    coordinates: coords[school['Postcode']]
  },
  pupils: school[ 'Total pupils'],
  inspectionDate: school[ 'Inspection date'],
  totalScore: school[ 'Overall effectiveness'],
  studyProg: school[ '16 to 19 study programmes'],
  earlyYears: school[ 'Early years provision (where applicable)'],
  outcomes: school[ 'Outcomes for children and learners'],
  quality: school[ 'Quality of teaching, learning and assessment'],
  personalDev: school[ 'Personal development, behaviour and welfare'],
  leadership: school[ 'Effectiveness of leadership and management'],
  prevInspectionDate: school[ 'Previous full inspection date'],
  prevTotalScore: school[ 'Previous full inspection overall effectiveness'],
  prevStudyProg: school[ 'Previous 16 to 19 study programmes'],
  prevEarlyYears: school[ 'Previous early years provision (where applicable)'],
  prevOutcomes: school[ 'Previous outcomes for children and learners'],
  prevQuality: school[ 'Previous quality of teaching, learning and assessment'],
  prevPersonalDev: school[ 'Previous personal development, behaviour and welfare'],
  prevLeadership: school[ 'Previous effectiveness of leadership and management'],
});

const tidyCrime = (crime) => ({
  month: crime.Month,
  reportedBy: crime['Reported by'],
  location: {
    coordinates: [crime.Longitude, crime.Latitude]
  },
  streetName: crime.Location,
  LSOAName: crime['LSOA name'],
  crimeType: crime['Crime type'],
  outcome: crime['Last outcome category'] || 'Unknown outcome'
});

module.exports = {
  tidySchool, parseSchools, getCoords, reduceCoords, tidyCrime
};
