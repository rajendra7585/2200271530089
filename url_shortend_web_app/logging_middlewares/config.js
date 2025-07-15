require('dotenv').config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/urlshortener',
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  DEFAULT_EXPIRY_MINUTES: 30
};
