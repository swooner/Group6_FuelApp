
const db = require( '../../src/dbconfig' );
const chai = require( '../server.test' ).chai;
const server = require( '../../src/server' );
const Quote = require( '../../src/models/quoteModel' );
const expect = require('chai').expect;
const default_user = require( '../server.test' ).user;
const userId = require( '../server.test' ).userId;


describe( 'use findAllQuotes()', () => {
    it( 'should get fuel quotes', done => {
        Quote.findAllQuotes()
            .then( result => {
                expect( result ).to.be.a( 'array' )
            });
        done();
    })
});

describe( 'use getFactor()', () => {
    const gallons = 300;
    it( 'should get fuel quote factor', done => {
        Quote.getFactor( userId, gallons  )
            .then( result => {
                expect( result ).to.be.a( 'float' )
            });
        done();
    })
});

describe( 'use getMargin()', () => {
    const gallons = 300;
    it( 'should get margin', done => {
        Quote.getMargin( userId, gallons  )
            .then( result => {
                expect( result ).to.be.a( 'float' )
            });
        done();
    })
});

describe( 'use getEstimate()', () => {
    const gallons = 300;
    it( 'should get estimate', done => {
        Quote.getEstimate( userId, gallons  )
            .then( result => {
                expect( result ).to.have.property( 'suggested_price_per_gallon' )
                expect( result ).to.have.property( 'totalAmountDue' )
            });
        done();
    })
});

describe( 'use submitNewQuote()', () => {
    let quote = {
        ClientInformation_ID: userId, 
        gallons: 300,
        delivery_date: '2021-8-31',
        suggested_price: 500,
        amount_due: 500,
        valid_until: '2021-9-30',
        quote_status: 'requested',
    };
    it( 'should submit quote', done => {
        Quote.submitNewQuote( quote )
            .then( result => {
                expect( result ).to.have.property( 'affectedRows', 1 )
            });
        done();
    })
    it( 'should reject quote', done => {
        quote.gallons = 'incorrect_type';
        Quote.submitNewQuote( quote )
            .catch( err => {
                expect( err ).to.have.property( 'code', 'ER_BAD_FIELD_ERROR' );
            });
        done();
    })
});
// 24.39 | 8-11,17-33,37-40,44-47,55-77
// 28.57 | 8-11,18-33,38-41,45-48,56-78
// 34.88 | 8-11,18-33,39-41,48-50,58-80  
// 73.33 | 9,39-41,48-50,77-82   