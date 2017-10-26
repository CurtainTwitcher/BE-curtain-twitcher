const app = require('./server');
const {PORT, db} = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
console.log(db);

mongoose.connect(`mongodb://${db.host}:${db.port}/${db.database}`, {useMongoClient: true})
  .then(() => console.log(`Successfully connected to mongodb://${db.host}:${db.port}/${db.database}`))
  .catch(err => console.log(`Connection failed: ${err}`));

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(PORT, (err) => {
  if (err) console.log({
    message: err
  });
  console.log(`Listening on port ${PORT}...`);
});