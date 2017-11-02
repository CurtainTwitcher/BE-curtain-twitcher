const app = require('./server');
const {PORT} = require('./config');

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(PORT, (err) => {
  if (err) console.log({
    message: err
  });
  console.log(`Listening on port ${PORT}...`);
});