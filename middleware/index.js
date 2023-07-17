const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('../router/index');
const errorMiddleware = require('./error-middleware');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

module.exports = app;
