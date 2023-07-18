require('dotenv').config();
const app = require('./middleware/index');
const { openConnectionDB } = require('./db/db');

const server = () => {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`);
  });
};


const start = async () => {
  try {
    await openConnectionDB();

    server();
  } catch (error) {
    console.log(error);
  }

};

start();
