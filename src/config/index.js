if (!process.env.NODE_ENV) {
  require('dotenv').config();
}

const config = {
  SERVER_PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
};

module.exports = config;
