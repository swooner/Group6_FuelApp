
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
exports.getIndex = (req, res, next) => {

    res.status(200).render('index', {
        title: `SuperFuel | Premium Quality Fuel Delivered Within a Click`
    });
}
exports.getDashboard = (req, res, next) => {

    res.status(200).render('dashboard', {
        title: `SuperFuel | Dashboard`
    });
}
exports.getCustomers = (req, res, next) => {
    res.status(200).render('customers', {
        title: `SuperFuel | Customers Management`
    });
}
exports.getQuotes = (req, res, next) => {
    res.status(200).render('quotes', {
        title: `SuperFuel | Quotes Management`
    });
}
exports.getInvoices = (req, res, next) => {
    res.status(200).render('invoices', {
        title: `SuperFuel | Invoices Management`
    });
}
exports.getPayments = (req, res, next) => {
    res.status(200).render('payments', {
        title: `SuperFuel | Payments Management`
    });
}
exports.getUsers = (req, res, next) => {
    res.status(200).render('users', {
        title: `SuperFuel | Users Management`
    });
}