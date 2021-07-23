
const { body, validationResult } = require('express-validator');
const { insertUser, loginUser, verifyToken } = require( '../models/userModel' );

// Display home page
exports.getIndex = ( req, res, next ) => {
    res.status( 200 ).render( 'index', {
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
            const callback = ( user ) => {
                console.log( 'user:', user );
                if ( user ) {
                    res.redirect('/user/settings');
                }
                return user;
            };
            insertUser({ 
                email: req.body.email,
                password: req.body.password,
                callback
            })
            callback();
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
            const callback = ({ token, error }) => {
                if ( token ) {
                    res.status( 200 ).json({ token });
                }
                else if ( error == 'NO_USER' ) {
                    res.status(400).render('index', { title: 'Super Fuel', user: req.body, loginErrors: [{ msg: 'There was no match for your credentials.' }] });
                }
            };
            loginUser({ 
                email: req.body.email,
                password: req.body.password,
                callback
            });
        }
    }
];

// Handle quote request form on GET
exports.quote_request_get = function (req, res) {
    res.render('request_fuel_quote');
};

// Handle quote request form on POST
exports.quote_request_post = [
    body('gallons').trim().isNumeric().withMessage('Gallon amount must be valid')
        .isFloat({ min: 0.5 }).withMessage('Gallon amount must be valid').escape(),
    body('date_delivery').isISO8601().toDate().withMessage('Delivery date must be valid')
        .isAfter().withMessage('Delivery date must be in future').escape(),
    body('suggested_price', 'Suggested price must be valid').isNumeric().escape(),
    body('amount_due', 'Amount due must be valid').isNumeric().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).render('request_fuel_quote', { title: 'Request Fuel', quote: req.body, errors: errors.array() });
            return;
        }
        else {
            res.redirect('/user');
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