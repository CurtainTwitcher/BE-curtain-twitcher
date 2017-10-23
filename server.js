const app = require('express')();
const {json} = require('body-parser');
const db = require('./db');

app.use(json());
module.exports = app;