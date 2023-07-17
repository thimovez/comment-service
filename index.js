require('dotenv').config();
const app = require('./middleware/index');
const { openConnection } = require('./db/db');

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await openConnection();
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(error);
  }

};

start();
