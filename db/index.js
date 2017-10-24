const initOptions = {promiseLib: Promise};
const pgp = require('pg-promise')(initOptions);

const config = require('../config');
module.exports = pgp(config.db);