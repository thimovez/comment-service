'use strict';
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const router = require('./router/index');
const errorMiddleware = require('./middleware/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(error);
  }

};

start();
