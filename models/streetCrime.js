const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const streetCrimeSchema = new Schema({
  month: String,
  reportedBy: String,
  location: {
    type: {type: String, default: 'Point'},
    coordinates: [Number],
    index: {type: String, default: '2d'}
  },
  streetName: String,
  LSOAName: String,
  crimeType: String,
  outcome: String
});

module.exports = mongoose.model('streetCrime', streetCrimeSchema);