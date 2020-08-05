const db = require('../db.lib');
const urls = db.get('url');

urls.createIndex({ _id: 1 });
urls.createIndex({ name: 1 });

module.exports = urls;
