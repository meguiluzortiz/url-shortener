const path = require('path');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerPath = path.join(__dirname, './api.yaml');
const swaggerDocument = yaml.load(swaggerPath);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerDocument),
};
