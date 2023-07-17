require('dotenv').config();
const { sequelize } = require('./models');
const app = require('./middleware/index');

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}/`);
    });
    await sequelize.close();
  } catch (error) {
    console.log(error);
  }

};

start();
