require('dotenv').config();

module.exports = {
  db: process.env.DB_URL, 
  PORT: process.env.PORT || 3000
};