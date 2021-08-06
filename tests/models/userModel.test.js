
const db = require( '../../src/dbconfig' );
const chai = require( '../server.test' ).chai;
const server = require( '../../src/server' );
const bcrypt = require( 'bcryptjs' );
const User = require( '../../src/models/userModel' );
const expect = require('chai').expect;
const default_user = require( '../server.test' ).user;
const userId = require( '../server.test' ).userId;

describe( 'use findAllUser()', () => {
    it( 'should get users', done => {
        User.findAllUser()
            .then( result => {
                expect( result ).to.be.a( 'array' )
            });
        done();
    })
});

describe( 'use findUser()', () => {
    const user = {
        email: default_user.email
    };
    it( 'should get user', done => {
        User.findUser( user.email )
            .then( result => {
                expect( result ).to.be.a( 'array' )
            });
        done();
    })
});


describe( 'use findUserById()', () => {
    it( 'should get user', done => {
        User.findUserById( userId )
            .then( result => {
                expect( result ).to.be.a( 'array' )
            });
        done();
    })
});

// describe( 'use createPasswordCredential()', () => {
//     it( 'should create password credential', async done => {
//         const password = 'Pass1!word';
//         const hashPassword = await bcrypt.hash( password, 15 );
//         try {
//             const credential = await User.createPasswordCredential( hashPassword );
//             console.log( 'credential:', credential );
//             expect( credential ).to.have.property( 'affectedRows', 1 );
//             done();
//         }
//         catch ( err ) {
//             console.log( 'err:', err );
//         }
//     })
// });

describe( 'use findQuoteHistory()', () => {
    it( 'should get quote history', done => {
        User.findQuoteHistory( userId )
            .then( result => {
                expect( result ).to.be.a( 'array' )
            });
        done();
    })
    it( 'should not get quote history', done => {
        userId = null;
        User.findQuoteHistory( userId )
            .catch( err => {
                expect( err ).to.have.property( 'code' )
            });
        done();
    })
});

describe( 'use findAllCustomers()', () => {
    it( 'should get all customers', done => {
        User.findAllCustomers( userId )
            .then( result => {
                expect( result ).to.be.a( 'array' )
            });
        done();
    })
});

describe( 'use updatePhotoUrl()', () => {
    let photo_url = 'hello.jpg'
    it( 'should get all customers', done => {
        User.updatePhotoUrl( userId, photo_url )
            .then( result => {
                expect( result ).to.be.a( 'array' )
            });
        done();
    })
    it( 'should not get all customers', done => {
        userId = null;
        User.updatePhotoUrl( userId )
            .catch( err => {
                expect( err ).to.have.property( 'code' )
            });
        done();
    })
});

