
const db = require( '../../src/dbconfig' );
const chai = require( '../server.test' ).chai;
const server = require( '../../src/server' );
const quoteController = require( '../../src/controllers/quoteController' );
const authController = require( '../../src/controllers/authController' );
const expect = require('chai').expect;
const default_user = require( '../server.test' ).user;
const userId = require( '../server.test' ).userId;

describe( 'addDays function', () => {
    it( 'should add days to date', done => {
        const daysToAdd = 30;
        const valid_until = quoteController.addDays( '', daysToAdd );
        const currentDate = new Date().getDate();
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        expect( valid_until ).to.equal( `${ currentMonth + 2 }/${ currentDate - 1 }/${ currentYear }` );
        done();
    });
});

describe( 'formatDate function', () => {
    it( 'should format date', done => {
        const date = '8/6/2021';
        const formatted = quoteController.formatDate( date );
        expect( formatted ).to.equal( `2021-8-6` );
        done();
    });
});

describe( 'POST valid /request-quote', () => {
    beforeEach( () => {
        const sql = `
            DELETE FROM Fuel_Quote;
        `;
        db.query( sql, ( error, result ) => {
            if ( error ) {
                return error;
            };
            chai.request( server )
                .post( '/user/sign-in' )
                .send( default_user )
        });
    });
    it( 'should accept quote', done => {
        const token = authController.signToken( userId );
        const quote = {
            gallons: 200,
            delivery_date: '2021-8-6',
            suggested_price: 300.00,
            amount_due: 400.00
        };
        chai.request( server )
            .post( `/quote/request-quote/${ userId }` )
            .set( 'Authorization', `Bearer ${ token }` )
            .send( quote )
            .end( ( err, response ) => {
                // console.log( 'should accept quote err:', err );
                // console.log( 'response:', response );
                response.should.have.status( 202 );
                response.body.should.have.property( 'message' ).eq( 'Successfully submitted the quote request!' );
            })
            done();
    });
});
// describe( 'POST invalid /request-quote', () => {
//     it( 'should reject invalid quote', done => {
//         const token = authController.signToken( userId );
//         const quote = {
//             gallons: 'invalid gallon type',
//             delivery_date: '2021-8-6',
//             suggested_price: 300.00,
//             amount_due: 400.00,
//         };
//         chai.request( server )
//             .post( `/quote/request-quote/${ userId }` )
//             .set( 'Authorization', `Bearer ${ token }` )
//             .send( quote )
//             .end( ( err, response ) => {
//                 if ( err )
//                 // console.log( 'err:', err );
//                 // console.log( 'response:', response );
//                 response.should.have.status( 400 );
//                 response.body.should.have.property( 'message' ).eq( 'Failed to submit the quote request! Please try again.' );
//             })
//             done();
//     });
//     // afterEach( () => {
//     //     chai.request( server )
//     //         .get( '/user/sign-out' )
//     // });
// });



describe( 'POST /request-estimate', () => {
    beforeEach( () => {
        chai.request( server )
            .post( '/user/sign-in' )
            .send( default_user )
    });
    it( 'should accept estimate', done => {
        const token = authController.signToken( userId );
        const estimate = {
            gallons: 200,
            delivery_date: '2021-8-6'
        };
        chai.request( server )
            .post( `/quote/request-estimate/${ userId }` )
            .set( 'Authorization', `Bearer ${ token }` )
            .send( estimate )
            .end( ( err, response ) => {
                // console.log( 'err:', err );
                // console.log( 'response:', response );
                response.should.have.status( 200 );
                response.body.should.have.property( 'message' )
                    .eq( 'Your suggested Price and Total Amount Due has been updated' );
            })
            done();
    });
});

// 4-8,11-17,21-47,51-70 
// 16-22,27-53,57-76 
// 26-52,56-75
// 24-51,55-74
// 36-50,54-74