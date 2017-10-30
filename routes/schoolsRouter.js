const router = require('express').Router();
const getSchools = require('../controllers/getSchools');

router.route('/')
  .get(getSchools);

module.exports = router;