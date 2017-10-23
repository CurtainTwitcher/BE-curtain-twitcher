const app = require('./server');
const {PORT} = require('./config');
const db = require('./db');

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, (err) => {
  if (err) console.log({
    message: err
  });
  console.log(`listening on port ${PORT}...`)
});