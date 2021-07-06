"use strict";

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

//routers declaration
const viewRouter = require('./routes/viewRoutes');

app.use(express.json()); //middleware to parse all req res to json type
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(`${__dirname}/views`));
app.use(express.static(`${__dirname}/public`));

//ROUTES

app.use('/', viewRouter);


module.exports = app;