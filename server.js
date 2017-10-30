const app = require('express')();
const {json} = require('body-parser');
const streetcrimesRouter = require('./routes/streetcrimesRouter');
const schoolsRouter = require('./routes/schoolsRouter');

app.use(json());

app.use('/api/crimes', streetcrimesRouter);
app.use('/api/schools', schoolsRouter);

module.exports = app;