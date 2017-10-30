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

module.exports = tidyCrime;