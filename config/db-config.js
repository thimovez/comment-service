module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: (...msg) => console.log(msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 5000
    }
  },
  test: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_TEST,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: true
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_PRODUCTION,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: false
  }
};
