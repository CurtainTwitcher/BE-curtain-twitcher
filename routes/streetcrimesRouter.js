const router = require('express').Router();
const getRecentCrimes = require('../controllers/getRecentCrimes');

router.route('/')
  .get(getRecentCrimes);

module.exports = router;