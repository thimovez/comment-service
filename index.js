require('dotenv').config();
const express = require('express');
const router = require('./router/index');
const errorMiddleware = require('./middleware/error-middlewate');

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`)
  });
};

start();