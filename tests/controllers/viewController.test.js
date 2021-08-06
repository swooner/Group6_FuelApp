
const db = require( '../../src/dbconfig' );
const chai = require( '../server.test' ).chai;
const server = require( '../../src/server' );
const authController = require( '../../src/controllers/authController' );
const default_user = require( '../server.test' ).user;
const userId = require( '../server.test' ).userId;

describe( 'GET /', () => {
    it( 'should get index route', done => {
        chai.request( server )
            .get( '/' )
            .end( ( err, response ) => {
                response.should.have.status( 200 )
            })
            done();
    });
});

describe( 'GET /customers', () => {
    beforeEach( () => {
        chai.request( server )
            .post( '/user/sign-in' )
            .send( default_user )
    });
    it( 'should get customer route', done => {
        const token = authController.signToken( userId );
        chai.request( server )
            .get( '/customers' )
            .set( 'Authorization', `Bearer ${ token }` )
            .end( ( err, response ) => {
                response.should.have.status( 200 )
            })
            done();
    });
});

describe( 'GET /quotes', () => {
    beforeEach( () => {
        chai.request( server )
            .post( '/user/sign-in' )
            .send( default_user )
    });
    it( 'should get quotes route', done => {
        const token = authController.signToken( userId );
        chai.request( server )
            .get( '/quotes' )
            .set( 'Authorization', `Bearer ${ token }` )
            .end( ( err, response ) => {
                response.should.have.status( 200 )
            })
            done();
    });
});

describe( 'GET /invoices', () => {
    beforeEach( () => {
        chai.request( server )
            .post( '/user/sign-in' )
            .send( default_user )
    });
    it( 'should get invoices route', done => {
        const token = authController.signToken( userId );
        chai.request( server )
            .get( '/invoices' )
            .set( 'Authorization', `Bearer ${ token }` )
            .end( ( err, response ) => {
                response.should.have.status( 200 )
            })
            done();
    });
});

describe( 'GET /payments', () => {
    beforeEach( () => {
        chai.request( server )
            .post( '/user/sign-in' )
            .send( default_user )
    });
    it( 'should get payments route', done => {
        const token = authController.signToken( userId );
        chai.request( server )
            .get( '/payments' )
            .set( 'Authorization', `Bearer ${ token }` )
            .end( ( err, response ) => {
                response.should.have.status( 200 )
            })
            done();
    });
});

describe( 'GET /users', () => {
    beforeEach( () => {
        chai.request( server )
            .post( '/user/sign-in' )
            .send( default_user )
    });
    it( 'should get users route', done => {
        const token = authController.signToken( userId );
        chai.request( server )
            .get( '/users' )
            .set( 'Authorization', `Bearer ${ token }` )
            .end( ( err, response ) => {
                response.should.have.status( 200 )
            })
            done();
    });
});


// 65.52 | 7,18,36-40,45,50,55,60
// 68.97 | 18,36-40,45,50,55,60
// 72.41 | 36-40,45,50,55,60  
// 68.97 | 18,36-40,45,50,55,60
// 68.97 | 18,36-40,45,50,55,60
