"use strict";

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

//routers declaration
const viewRouter = require('./routes/viewRoutes');
const userRouter = require('./routes/userRoutes');
const quoteRouter = require('./routes/quoteRoutes');
const errorRouter = require('./routes/errorRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(`${__dirname}/views`));
app.use(express.static(`${__dirname}/public`));

app.use(express.json()); //middleware to parse all req res to json type
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());




//ROUTES

app.use('/', viewRouter);
app.use('/user', userRouter);
app.use('/quote', quoteRouter);
app.all('*', errorRouter);

module.exports = app;