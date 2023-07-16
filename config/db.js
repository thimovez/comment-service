module.exports = {
  development: {
    username: 'postgres',
    password: 'root',
    database: 'commentservice',
    host: 'db',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'postgres',
    password: 'root',
    database: 'commentservice_test',
    host: 'db',
    dialect: 'postgres',
    logging: true
  },
  production: {
    username: 'postgres',
    password: 'root',
    database: 'commentservice_development',
    host: 'db',
    dialect: 'postgres',
    logging: false
  }
};
