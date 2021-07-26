const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const Quote = require('../models/quoteModel');

exports.getIndex = (req, res, next) => {

    res.status(200).render('index', {
        title: `SuperFuel | Premium Quality Fuel Delivered Within a Click`
    });
}
exports.getDashboard = async (req, res, next) => {
    const users = await User.findAllUser();
    const quotes = await Quote.findAllQuotes();
    const totalQuote = quotes.length;
    const totalCustomer = users.length;
    let totalPayment = 0;
    quotes.forEach(record => {
        totalPayment += record.amount_due;
    });

    const statistic = {
        totalQuote,
        totalCustomer,
        totalPayment
    }
    res.locals.statistic = statistic;
    res.status(200).render('dashboard', {
        title: `SuperFuel | Dashboard`
    });
}




exports.getCustomers = async (req, res, next) => {
    const customers = await User.findAllCustomers();
    if (customers.length !== 0) {
        res.locals.customers = customers;
    }
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