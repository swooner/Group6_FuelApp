
const Quote = require( '../models/quote' );
const { body,validationResult } = require( 'express-validator' );

// Handle quote request form on GET
exports.quote_request_get = function ( req, res ) {
    res.render( 'request_fuel_quote' );
};

// Handle quote request form on POST
exports.quote_request_post = [
    body( 'gallons' ).trim( ).isNumeric().withMessage( 'Gallon amount must be valid' )
        .isFloat({ min: 0.5 }).withMessage( 'Gallon amount must be valid' ).escape( ),
    body( 'date_delivery' ).isISO8601().toDate().withMessage( 'Delivery date must be valid' )
        .isAfter().withMessage( 'Delivery date must be in future' ).escape( ),
    body( 'suggested_price', 'Suggested price must be valid' ).isNumeric().escape( ),
    body( 'amount_due', 'Amount due must be valid' ).isNumeric().escape( ),
    ( req, res, next ) => {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            res.status(400).render( 'request_fuel_quote', { title: 'Request Fuel', quote: req.body, errors: errors.array( ) } );
            return;
        }
        else {
            res.redirect( '/user' );
        }
    }
];