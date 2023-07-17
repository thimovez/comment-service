const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('../router/index');
const errorMiddleware = require('./error-middleware');
const { closeConnection } = require('../models/index');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.on('finish', closeConnection);
  next();
});
app.use('/api', router);
app.use(errorMiddleware);

module.exports = app;
