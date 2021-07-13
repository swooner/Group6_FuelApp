
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

// Display home page
exports.getIndex = (req, res, next) => {
    res.status(200).render( `index`, {
        title: `Super Fuel | Premium Fuel Delivered in a Click`
    });
}

// Display user sign-up form on GET
exports.signUp_get = function (req, res) {
    res.render('index');
};

// Handle user sign-up form on POST
exports.signUp_post = [
    body('email', 'Email must be valid').trim().isEmail().normalizeEmail().escape(),
    body('password')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
        }),
    body('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    (req, res, next) => {
        console.log('req.body:', req.body);
        const errors = validationResult(req);
        console.log('errors:', errors);
        if (!errors.isEmpty()) {
            res.render('index', { title: 'Super Fuel', user: req.body, errors: errors.array() });
            return;
        }
        else {
            console.log('No errors! Form is valid');
            const user = User.addUser(req.body.email, req.body.password);
            console.log('user:', user);
            if (user) {
                res.redirect( '/user/settings' );
            }
        }
    }
];

// Display user log-in form on GET
exports.login_get = function (req, res) {
    res.render('index');
};

// Handle user log-in form on POST
exports.login_post = [
    body('email', 'Email is required').trim().isLength({ min: 1 }).isEmail().normalizeEmail().escape(),
    body('password', 'Password is required').trim().isLength({ min: 1 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render( 'index', { title: 'Super Fuel', user: req.body, loginErrors: errors.array() });
            return;
        }
        else {
            res.redirect( '/dashboard' );
        }
    }
];

// Display user log-in form on GET
exports.dashboard_get = function (req, res) {
    res.render( 'dashboard' );
};