
const chai = require( '../server.test' ).chai;
const server = require( '../../src/server' );

describe( 'GET error page', () => {
    it ( 'should render error page', done => {
        chai.request( server )
            .get( '/superkalifrajiliciousexpaneladosis' )
            .end( ( err, response ) => {
                response.should.have.status( 200 );
            })
            done();
    })
});
