
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

// Display home page
exports.getIndex = (req, res, next) => {
    res.status(200).render( `request_fuel_quote`, {
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
                res.redirect('profile')
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
    body('email', 'Email must be valid').trim().isLength({ min: 1 }).isEmail().normalizeEmail().escape(),
    body('password').trim().isLength({ min: 1 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    (req, res, next) => {
        res.redirect('dashboard');
    }
];