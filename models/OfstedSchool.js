const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfstedSchoolSchema = new Schema({
  URN: {
    type: String,
    required: true
  },
  LAESTAB: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phase: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  sixthForm: {
    type: String,
    required: true
  },
  religion: {
    type: String,
    required: true
  },
  localAuth: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String, 
      default: 'Point'
    },
    coordinates: [Number],
    index: {
      type: String, 
      default: '2d'
    }
  },
  pupils: {
    type: String,
    required: true
  },
  inspectionDate: {
    type: String,
    required: true
  },
  totalScore: {
    type: String,
    required: true
  },
  studyProg: {
    type: String,
    required: true
  },
  earlyYears: {
    type: String,
    required: true
  },
  outcomes: {
    type: String,
    required: true
  },
  quality: {
    type: String,
    required: true
  },
  personalDev: {
    type: String,
    required: true
  },
  leadership: {
    type: String,
    required: true
  },
  prevInspectionDate: {
    type: String,
    required: true
  },
  prevTotalScore: {
    type: String,
    required: true
  },
  prevStudyProg: {
    type: String,
    required: true
  },
  prevEarlyYears: {
    type: String,
    required: true
  },
  prevOutcomes: {
    type: String,
    required: true
  },
  prevQuality: {
    type: String,
    required: true
  },
  prevPersonalDev: {
    type: String,
    required: true
  },
  prevLeadership: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('ofstedSchool', OfstedSchoolSchema);