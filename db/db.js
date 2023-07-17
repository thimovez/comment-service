const { sequelize } = require('../models/index');

class DBService {
  // Test the connection
  async openConnection() {
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
  async closeConnection() {
    try {
      await sequelize.close()
        .then(() => {
          console.log('Connection closed successfully.');
        });
    } catch (err) {
      console.error('Error closing the connection:', err);
    }
  }
}

module.exports = new DBService();
