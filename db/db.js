const { sequelize } = require('../models/index');

class DBService {
  // Test the connection
  async openConnectionDB() {
    try {
      await sequelize.authenticate()
        .then(() => {
          console.log('Connection to db has been established successfully.');
        });
    } catch (err) {
      console.error('Unable to connect to the database:', err);
    }
  }

  //Close the connection function
  async closeConnectionDB() {
    try {
      await sequelize.close()
        .then(() => {
          console.log('SQl connection closed successfully.');
        });
      process.exit(0);
    } catch (err) {
      console.error('Error closing the connection:', err);
    }
  }
}

module.exports = new DBService();
