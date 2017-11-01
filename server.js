if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const app = require('express')();
const { json } = require('body-parser');
const streetCrimesRouter = require('./routes/streetCrimesRouter.js');
const schoolsRouter = require('./routes/schoolsRouter');
const { db } = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect(db , {useMongoClient: true})
  .then(() => console.log(`Successfully connected to ${db}`))
  .catch(err => console.log(`Connection failed: ${err}`));

app.use(json());

app.use('/api/crimes', streetCrimesRouter);
app.use('/api/schools', schoolsRouter);

app.use('/*', (req, res, next) => {
  res.status(404).send({msg: 'invalid url request'});
});

app.use((err, req, res, next) => {
  if (err.type === 404) return res.status(404).send({msg: 'invalid url request'});
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({err});
});

module.exports = app;