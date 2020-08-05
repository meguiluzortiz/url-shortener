const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(require('./routes/url.routes'));

app.use((error, _, res, __) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '\u{1F4E6}' : error.stack,
  });
});

const port = config.SERVER_PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});