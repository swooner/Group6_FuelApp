
const db = require( '../../src/dbconfig' );
const chai = require( '../server.test' ).chai;
const server = require( '../../src/server' );
const authController = require( '../../src/controllers/authController' );
const default_user = require( '../server.test' ).user;
const userId = require( '../server.test' ).userId;


describe( 'GET /request_fuel_quote', () => {
    beforeEach( () => {
        chai.request( server )
            .post( '/user/sign-in' )
            .send( default_user )
    });
    it( 'should get fuel quote route', done => {
        const token = authController.signToken( userId );
        chai.request( server )
            .get( '/user/request_fuel_quote' )
            .set( 'Authorization', `Bearer ${ token }` )
            .end( ( err, response ) => {
                response.should.have.status( 200 )
            })
            done();
    });
});


describe( 'GET /change_password', () => {
    beforeEach( () => {
        chai.request( server )
            .post( '/user/sign-in' )
            .send( default_user )
    });
    it( 'should get fuel quote route', done => {
        const token = authController.signToken( userId );
        chai.request( server )
            .get( '/user/change_password' )
            .set( 'Authorization', `Bearer ${ token }` )
            .end( ( err, response ) => {
                response.should.have.status( 200 )
            })
            done();
    });
});

describe( 'GET /profile', () => {
    beforeEach( () => {
        chai.request( server )
            .post( '/user/sign-in' )
            .send( default_user )
    });
    it( 'should get profile route', done => {
        const token = authController.signToken( userId );
        chai.request( server )
            .get( '/user/profile' )
            .set( 'Authorization', `Bearer ${ token }` )
            .end( ( err, response ) => {
                response.should.have.status( 200 )
            })
            done();
    });
});

describe( 'GET /settings', () => {
    beforeEach( () => {
        chai.request( server )
            .post( '/user/sign-in' )
            .send( default_user )
    });
    it( 'should get settings route', done => {
        const token = authController.signToken( userId );
        chai.request( server )
            .get( '/user/settings' )
            .set( 'Authorization', `Bearer ${ token }` )
            .end( ( err, response ) => {
                response.should.have.status( 200 )
            })
            done();
    });
});



describe( 'PUT /settings', () => {
    beforeEach( () => {
        chai.request( server )
            .post( '/user/sign-in' )
            .send( default_user )
    });
    it( 'should get fuel quote route', done => {
        const token = authController.signToken( userId );
        const info = {
            first_name: 'John',
            last_name: 'Doe',
            company: 'JohnCompany',
            email: 'n@n.com',
            phone_number: '2221113434',
            street_number: '123',
            street_name: 'Dream St',
            city: 'Sugar Land',
            state: 'TX',
            zip_code: '77479',
            country: 'US'
        };
        chai.request( server )
            .put( `/user/settings/${ userId }` )
            .set( 'Authorization', `Bearer ${ token }` )
            .send( info )
            .end( ( err, response ) => {
                response.should.have.status( 202 )
            })
            done();
    });
});



// 29.55 | 7-11,16-20,34-49,53,58-63,68-91,95,100
// 29.55 | 7-11,16-20,34-49,53,58-63,68-91,95,100
// 47.73 | 7-11,16-20,34-49,53,58-63,78-91,95,100