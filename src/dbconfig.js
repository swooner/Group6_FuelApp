const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const mysql = require('mysql');


const config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
};

const connection = mysql.createConnection(config);

module.exports = connection;