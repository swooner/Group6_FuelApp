const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const mysql = require('mysql');


const config = {
    host: 'localhost',//process.env.DATABASE_HOST,
    user: 'root',//process.env.DATABASE_USER,
    password: 'password',//process.env.DATABASE_PASSWORD,
    database: 'fueldb',//process.env.DATABASE_NAME,
};

const db = mysql.createConnection(config);

module.exports = db;