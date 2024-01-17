const config =  require('./config/config');
const process = require('node:process');
const app = require('./middleware');
const {
  openConnectionDB,
  closeConnectionDB
} = require('./db/db');


const start = async () => {
  try {
    app.listen(config.PORT, config.HOST, () => {
      console.log(`App listeting on http://${config.HOST}:${config.PORT}`);
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
