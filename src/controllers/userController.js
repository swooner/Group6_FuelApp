
const User = require('../models/userModel');
const { body, validationResult } = require('express-validator');
const { getUser, updateUser } = require( '../models/userModel' );

// Display user profile
exports.user_profile_get = function (req, res) {
    res.render('profile');
};

// Display user profile form on GET
exports.user_settings_get = (req, res) => {
    const sessionUser = req.session.user;
    // console.log( 'sessionUser:', sessionUser );
    const callback = ({ user, error }) => {
        if ( error ) {
            res.sendStatus( 400 );
        }
        // console.log( 'user:', user );
        res.status( 200 ).render( 'settings', { title: 'Settings', user } );
    };
    if ( sessionUser ) {
        getUser({ user: sessionUser, callback });
    }
    else {
        res.sendStatus( 403 );
    }
};

// Display user change password form on GET
exports.user_change_password_get = function (req, res) {
    res.render('change_password');
};
// Display user change password form on GET
exports.user_request_fuel_quote_get = function (req, res) {
    console.log(User.getAllUser());
    res.render('request_fuel_quote');
};



// Handle user profile form on POST
exports.user_settings_post = [
    body('first_name', 'First name must be valid').trim().isLength({ min: 1, max: 50 }).escape(),
    body('last_name', 'Last name must be valid').trim().isLength({ min: 1, max: 50 }).escape(),
    body('address1', 'Address must be valid').trim().isLength({ min: 1, max: 100 }).escape(),
    body('address2', 'Address must be valid').trim().optional({ checkFalsy: true }).trim().isLength({ max: 100 }).escape(),
    body('city', 'City must be valid').trim().isLength({ min: 1, max: 100 }).escape(),
    body('state', 'State must be valid').trim().isLength({ min: 1, max: 2 }).escape(),
    body('zip_code', 'Zip code must be valid').trim().isLength({ min: 5, max: 9 }).isPostalCode('US').isNumeric().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).render('settings', { title: 'Settings', user: req.body, errors: errors.array() });
            return;
        }
        else {
            const callback = ( user ) => {
                // console.log( 'user:', user );
                if ( user ) {
                    res.status( 200 ).render( 'settings', { title: 'Settings', user } );
                }
            };
            updateUser({ 
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                address1: req.body.address1,
                address2: req.body.address2,
                city: req.body.city,
                state: req.body.state,
                zip_code: req.body.zip_code,
                token: req.token,
                callback
            });
        }
    }
];