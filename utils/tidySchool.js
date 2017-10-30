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

module.exports = tidySchool;