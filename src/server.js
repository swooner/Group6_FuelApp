"use strict";
const app = require('./app');
const path = require('path');
const config = require('./dbconfig');
const dotenv = require('dotenv');
const DBconnection = require('./dbconfig');
const PORT = process.env.PORT || 8000;

DBconnection.connect((err) => {
    if (err) {
        console.log(err);

    } else {
        console.log('Connection to database has been established successfully!');
    }
})
const server = app.listen(PORT, () => {
    console.log(`Application is running on ${PORT}...`);
});