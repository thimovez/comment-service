require('dotenv').config();
const process = require('node:process');
const app = require('./middleware');
const {
  openConnectionDB,
  closeConnectionDB
} = require('./db/db');

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await openConnectionDB();
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(error);
  }

};

start();

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  app.close(() => {
    console.log('Http server closed.');
    closeConnectionDB();
  });
});
