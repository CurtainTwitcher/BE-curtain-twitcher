const router = require('express').Router();
const getSchools = require('../controllers/getSchools');
const getSchoolTrends = require('../controllers/getSchoolTrends');

router.route('/')
  .get(getSchools);

router.route('/trends')
  .get(getSchoolTrends);

module.exports = router;