const dotenv = require('dotenv');
const path = require('path');

const envPath = __dirname.slice(0, -11);

dotenv.config({
    path: path.resolve(envPath, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 5000
};
