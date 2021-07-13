
const User = require( '../models/user' );
const { body,validationResult } = require( 'express-validator' );

// Display user profile
exports.user_profile_get = function ( req, res ) {
    res.render( 'profile' );
};

// Display user profile form on GET
exports.user_settings_get = function ( req, res ) {
    res.render( 'settings' );
};

// Handle user profile form on POST
exports.user_settings_post = [
    body( 'first_name', 'First name must be valid' ).trim( ).isLength({ max: 50 }).escape( ),
    body( 'last_name', 'Last name must be valid' ).trim( ).isLength({ max: 50 }).escape( ),
    body( 'address1', 'Address must be valid' ).trim( ).isLength({ max: 100 }).escape( ),
    body( 'address2', 'Address must be valid' ).optional({ checkFalsy: true }).trim( ).isLength({ max: 100 }).escape( ),
    body( 'city', 'City must be valid' ).trim( ).isLength({ max: 100 }).escape( ),
    body( 'state', 'State must be valid' ).trim( ).isLength({ max: 2 }).escape( ),
    body( 'zip_code', 'Zip code must be valid' ).trim( ).isLength({ min: 5, max: 9 }).isPostalCode( 'US' ).isNumeric().escape( ),
    ( req, res, next ) => {
        console.log( 'req.body:', req.body );
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            res.render( 'settings', { title: 'Settings', user: req.body, errors: errors.array( ) } );
            return;
        }
        else {
            console.log( 'No errors! Form is valid' );
            // const user = User.updateUser( req.body );
            // console.log( 'user:', user );
            // if ( user ) {
                res.redirect( '/user' )
            // }
        }
    }
];