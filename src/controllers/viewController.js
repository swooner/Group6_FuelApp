
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

// Display home page
exports.getIndex = (req, res, next) => {
    res.status(200).render(`index`, {
        title: `Super Fuel | Premium Fuel Delivered in a Click`
    });
}

// Handle user sign-up form on POST
exports.signUp_post = [
    body('email', 'Email must be valid').trim().isEmail().normalizeEmail().escape(),
    body('password')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }),
    body('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).render('index', { title: 'Super Fuel', user: req.body, signUpErrors: errors.array() });
            return;
        }
        else {
            res.redirect('/user/settings');
        }
    }
];

// Handle user log-in form on POST
exports.login_post = [
    body('email', 'Email is required').trim().isEmail().normalizeEmail().escape(),
    body('password', 'Password is required').trim().isLength({ min: 1 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).render('index', { title: 'Super Fuel', user: req.body, loginErrors: errors.array() });
            return;
        }
        else {
            res.redirect('/dashboard');
        }
    }
];

// Display user log-in form on GET
exports.dashboard_get = function (req, res) {
    res.render('dashboard');
};
// Display customers management page on GET
exports.customers_get = function (req, res) {
    res.render('customers');
};
// Display quotes management page on GET
exports.quotes_get = function (req, res) {
    res.render('quotes');
};
// Display invoices management page on GET
exports.invoices_get = function (req, res) {
    res.render('invoices');
};
// Display payments management page on GET
exports.payments_get = function (req, res) {
    res.render('payments');
};
// Display users management page on GET
exports.users_get = function (req, res) {
    res.render('users');
};

// Display fuel quote form on GET

exports.requestFuelQuote_get = function (req, res) {
    res.render('request_fuel_quote');
};