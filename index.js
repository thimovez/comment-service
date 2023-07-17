require('dotenv').config();
const app = require('./middleware/index');

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(error);
  }

};

start();
