
const Quote = require( '../models/quote' );
const { body,validationResult } = require( 'express-validator' );

// Display user profile
exports.quote_history_get = function ( req, res ) {
    res.render( 'quote_history' );
};

exports.quote_request_get = function ( req, res ) {
    res.render( 'request_fuel_quote' );
};

// Display user profile form on GET
exports.user_settings_get = function ( req, res ) {
    res.render( 'settings' );
};

// Handle user profile form on POST
exports.quote_request_post = [
    body( 'gallons', 'Gallon amount must be valid' ).trim( ).isNumeric().escape( ),
    body( 'address', 'Address must be valid' ).trim( ).escape( ),
    body( 'delivery_date', 'Delivery date must be valid' ).isISO8601().toDate().escape( ),
    body( 'suggested_price', 'Suggested price must be valid' ).isNumeric().escape( ),
    body( 'amount_due', 'Amount must be valid' ).isNumeric().escape( ),
    ( req, res, next ) => {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            res.render( 'request_fuel_quote', { title: 'Request Fuel',  errors: errors.array( ) } );
            return;
        }
        else {
            console.log( 'No errors! Form is valid' );
            const quote = User.addQuote( req.body );
            console.log( 'quote:', quote );
            if ( quote ) {
                res.redirect( 'quotes' )
            }
        }
    }
];