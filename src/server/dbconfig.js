const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const mysql = require('mysql');

const config = {
    // host: process.env.DATABASE_HOST,
    // user: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_NAME,
    host: 'fueldb-instance1.cnd9beqdlozb.us-east-1.rds.amazonaws.com',
    database: 'fueldb', // database name
    user: 'noble', // user name
    password: 'chansey', // password
};
const DBconnection = mysql.createConnection(config);

module.exports = DBconnection;