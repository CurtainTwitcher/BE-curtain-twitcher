const router = require('express').Router();
const getRecentCrimes = require('../controllers/getRecentCrimes');
const getCrimeTrends = require('../controllers/getCrimeTrends');

router.route('/')
  .get(getRecentCrimes);

router.route('/trends')
  .get(getCrimeTrends);

module.exports = router;