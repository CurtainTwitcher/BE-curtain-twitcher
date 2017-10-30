const app = require('express')();
const {json} = require('body-parser');
const streetcrimesRouter = require('./routes/streetcrimesRouter');
const schoolsRouter = require('./routes/schoolsRouter');

app.use(json());

app.use('/api/crimes', streetcrimesRouter);
app.use('/api/schools', schoolsRouter);

app.use('/*', (req, res, next) => {
  res.status(404).send({msg: 'page not found'});
});

app.use((err, req, res, next) => {
  if (err.type === 404) return res.status(404).send({msg: 'page not found'});
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({err});
});

module.exports = app;