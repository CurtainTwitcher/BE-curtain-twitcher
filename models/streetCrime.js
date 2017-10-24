const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const streetCrimeSchema = new Schema({
  month: String,
  reportedBy: String,
  longitude: String,
  latitude: String,
  location: String,
  LSOAName: String,
  crimeType: String,
  outcome: String
});

module.exports = mongoose.model('streetCrime', streetCrimeSchema);