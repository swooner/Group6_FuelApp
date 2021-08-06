
const db = require( '../../src/dbconfig' );
const chai = require( '../server.test' ).chai;
const server = require( '../../src/server' );
const expect = require('chai').expect;
const default_user = require( '../server.test' ).user;
const userId = require( '../server.test' ).userId;


const User = require( '../../src/models/userModel' );
const authController = require( '../../src/controllers/authController' );

describe( 'Initial POST /sign-up', () => {
    beforeEach( () => {
        // const sql = `
        //     DELETE FROM UserCredential
        // `;
        const sql = `
            DELETE FROM UserCredential 
            JOIN ClientInformation
                ON UserCredential.ID = ClientInformation.ID 
            WHERE ClientInformation.email = 'n5@n.com'
        `;
        db.query( sql, ( error, result ) => {
            if ( error ) {
                return error;
            };
        });
    });
    it( 'should insert a new user', async ( done ) => {
        const user = {
            email: 'n5@n.com',
            password: 'Pass1!word',
            confirm_password: 'Pass1!word',
        };
        chai.request( server )
            .post( '/user/sign-up' )
            .send( user )
            .end( ( err, response ) => {
                if ( response.body.ok === false ) {
                    response.should.have.status( 400 );
                    response.body.should.have.property( 'message' )
                        .eq( 'Error while trying to create your account! Please try again.' )
                }
                else {
                    response.should.have.status( 201 );
                    response.body.should.have.property( 'message' )
                        .eq( 'You have been successfully registered! Please sign-in to begin using your account.' )
                }
            })
            done();
    });
});

describe( 'POST /sign-up', () => {
    it( 'should reject invalid email', done => {
        const user = {
            email: '',
            password: 'Pass1!word',
            confirm_password: 'Pass1!word',
        };
        chai.request( server )
            .post( '/user/sign-up' )
            .send( user )
            .end( ( err, response ) => {
                response.should.have.status( 400 );
            })
            done();
    });
    it( 'should reject duplicate email', done => {
        const user = {
            email: default_user.email,
            password: 'Pass1!word',
            confirm_password: 'Pass1!word',
        };
        chai.request( server )
            .post( '/user/sign-up' )
            .send( user )
            .end( ( err, response ) => {
                if ( err ) {
                    // done( );
                    done( );
                }
                else {
                    response.should.have.status( 400 );
                    done( );
                }
            })
    });
    it( 'should sign web token', done => {
        const id = 123;
        const token = authController.signToken( id );
        expect( token ).to.be.a( 'string' );
        done();
    });
    it( 'should reject passwords that dont match', done => {
        const user = {
            email: 'n@n.com',
            password: 'Pass1!word',
            confirm_password: 'Pass1!wordsssss',
        };
        chai.request( server )
            .post( '/user/sign-up' )
            .send( user )
            .end( ( err, response ) => {
                response.should.have.status( 400 );
                done();
            })
    });
});


describe( 'POST /sign-in', () => {
    it( 'should sign in', async done => {
        chai.request( server )
            .post( '/user/sign-in' )
            .send( default_user )
            .end( ( err, response ) => {
                const token = authController.signToken( userId );
                response.should.have.cookie( 'jwt', token );
                response.should.have.status( 200 );
            })
            done();
    })
    it( 'should reject invalid email', done => {
        const user = {
            email: '',
            password: 'Pass1!word',
        };
        chai.request( server )
            .post( '/user/sign-in' )
            .send( user )
            .end( ( err, response ) => {
                response.body.should.have.property( 'message' ).eq( 'Please provide your Email and Password to sign-in' );
                response.should.have.status( 400 );
            })
            done();
    })
    it( 'should reject nonexistent user', done => {
        const user = {
            email: 'bob@bobby.com',
            password: 'Pass1!word',
        };
        chai.request( server )
            .post( '/user/sign-in' )
            .send( user )
            .end( ( err, response ) => {
                response.body.should.have.property( 'message' ).eq( 'There is no Email and/ or Password that match your credential' );
                response.should.have.status( 401 );
            })
            done();
    });
    it( 'should reject user with incorrect password', done => {
        const user = {
            email: default_user.email,
            password: 'Pass1!wordssssss',
        };
        chai.request( server )
            .post( '/user/sign-in' )
            .send( user )
            .end( ( err, response ) => {
                response.body.should.have.property( 'ok' ).eq( false );
                response.body.should.have.property( 'message' ).eq( 'There is no Email and/ or Password that match your credential' );
                response.should.have.status( 401 );
            })
            done();
    })
    afterEach( () => {
        chai.request( server )
            .get( '/user/sign-out' )
    });
});


describe( 'GET /sign-out', () => {
    it ( 'should sign out user', done => {
        chai.request( server )
            .get( '/user/sign-out' )
            .end( ( err, response ) => {
                response.should.have.status( 200 );
            })
            done();
    })
});


describe( 'GET /dashboard', () => {
    it( 'should reject unauthorized token', done => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE2MjgxMzk3NTZ9.yswZdVGzrRekyU4dBvAKEFTo8yt4E14C78dwE02tEmY';
        chai.request( server )
            .get( '/dashboard' )
            .set( 'Authorization', `Bearer ${ token }` )
            .end( ( err, response ) => {
                // console.log( 'response:', response );
                response.should.have.status( 401 );
            })
            done();

    });
    it ( 'should reject non-existent token', done => {
        chai.request( server )
            .get( '/dashboard' )
            .set( 'Authorization', `Bearer ${ '' }` )
            .end( ( err, response ) => {
                if ( err ) {
                    done()
                }
                else {
                    response.should.have.status( 401 );
                    done();
                }
            })
    });
});

describe( 'GET /dashboard from administrator', () => {
    beforeEach( () => {
        chai.request( server )
            .post( '/user/sign-in' )
            .send( default_user )
    });
    it( 'should accept user with admin role', done => {
        const token = authController.signToken( userId );
        chai.request( server )
            .get( '/dashboard' )
            .set( 'Authorization', `Bearer ${ token }` )
            .end( ( err, response ) => {
                // console.log( 'response:', response );
                response.should.have.status( 200 );
            })
            done();
    });
    afterEach( () => {
        chai.request( server )
            .get( '/user/sign-out' )
    });
});


describe( 'GET /dashboard from customer', () => {
    beforeEach( () => {
        const user = {
            emai: 'n1@n.com',
            password: 'Pass1!word',
        };
        chai.request( server )
            .post( '/user/sign-in' )
            .send( user )
    });
    it( 'should reject user with customer role', done => {
        const userId = 87;
        const token = authController.signToken( userId );
        chai.request( server )
            .get( '/dashboard' )
            .set( 'Authorization', `Bearer ${ token }` )
            .end( ( err, response ) => {
                if ( err ) {
                    done();
                }
                else {
                    response.should.have.status( 401 );
                    done();
                }
            })
    });
    afterEach( () => {
        chai.request( server )
            .get( '/user/sign-out' )
    });
});
