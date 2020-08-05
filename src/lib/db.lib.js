const config = require('../config');
const monk = require('monk');

const db = monk(config.MONGODB_URI);
db.then(() => {
  console.log('Connected correctly to db');
});
module.exports = db;
