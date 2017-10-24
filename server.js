const app = require('express')();
const {json} = require('body-parser');
const streetcrimesRouter = require('./routes/streetcrimesRouter');

app.use(json());

app.use('/api/crimes', streetcrimesRouter);

module.exports = app;