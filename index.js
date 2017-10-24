const app = require('./server');
const {PORT} = require('./config');
const db = require('./db');
const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/curtain_twitcher';
mongoose.Promise = Promise;

mongoose.connect(dbURL, {useMongoClient: true})
  .then(() => console.log(`Successfully connected to ${dbURL}`))
  .catch(err => console.log(`Connection failed: ${err}`));

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, (err) => {
  if (err) console.log({
    message: err
  });
  console.log(`Listening on port ${PORT}...`)
});