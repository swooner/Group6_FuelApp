
const app = require( '../src/app' );
const request = require( 'supertest' );

describe( 'GET /', ( ) => {
	it( 'should render home page', done => {
		request( app )
			.get( '/' )
			.expect( 200, done );
	});
});

describe( 'POST /login', ( ) => {
	it( 'should accept valid login credentials', done => {
		request( app )
			.post( '/login' )
			.send({ email: 'n@n.com', password: 'Keep,on1!' })
			.set( 'Accept', 'application/json' )
			.expect( 200, done );
	});
	it( 'should reject invalid email address', done => {
		request( app )
			.post( '/login' )
			.send({ email: 'fake_email', password: 'P1ass!word' })
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
	it( 'should reject empty password ', done => {
		request( app )
			.post( '/login' )
			.send({ email: 'fake_email', password: '' })
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
	it( 'should reject no credential match', done => {
		request( app )
			.post( '/login' )
			.send({ email: 'testy@gmail.co', password: 'P1ass!word' })
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
});

describe( 'POST /sign-up', ( ) => {
	// it( 'should accept valid sign up credientals', done => {
	// 	request( app )
	// 		.post( '/sign-up' )
	// 		.send({ email: 'testy2@gmail.com', password: 'P1ass!word', confirm_password: 'P1ass!word' })
	// 		.set( 'Accept', 'application/json' )
	// 		.expect( 302, done );
	// });
	it( 'should reject invalid email address', done => {
		request( app )
			.post( '/sign-up' )
			.send({ email: 'testgmail.com', password: 'P1ass!word', confirm_password: 'P1ass!word' })
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
	it( 'should reject invalid passwords', done => {
		request( app )
			.post( '/sign-up' )
			.send({ email: 'test@gmail.com', password: 'password', confirm_password: 'password' })
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
	it( 'should reject unmatched passwords', done => {
		request( app )
			.post( '/sign-up' )
			.send({ email: 'test@gmail.com', password: 'P1ass!word', confirm_password: 'otherP1ass!word' })
			.set( 'Accept', 'application/json' )
			.expect( res => {
				res.body.password = res.body.confirm_password;
			})
			.expect( 400, done );
	});
});

describe( 'GET /dashboard', ( ) => {
	it( 'should render dashboard page', done => {
		request( app )
			.get( '/dashboard' )
			.expect({})
			.expect( 200, done );
	});
});

describe( 'GET /user/profile', ( ) => {
	it( 'should render user profile page', done => {
		request( app )
			.get( '/user/profile' )
			.expect( 200, done );
	});
});

describe( 'GET /user/settings', ( ) => {
	it( 'should render user settings page', done => {
		request( app )
			.get( '/user/settings' )
			.expect( 200, done );
	});
});

describe( 'POST /user/settings', ( ) => {
	it( 'should accept valid settings', done => {
		request( app )
			.post( '/user/settings' )
			.send({ 
				first_name: 'Bo Gum', 
				last_name: 'Park', 
				address1: '123 Test Address',
				address2: 'Apt 100',
				city: 'Sugar Land',
				state: 'TX',
				zip_code: '77479'
			})
			.set( 'Accept', 'application/json' )
			.expect( 302, done );
	});
	it( 'should reject invalid first name', done => {
		request( app )
			.post( '/user/settings' )
			.send({ 
				first_name: '', 
				last_name: 'Park', 
				address1: '123 Test Street',
				address2: '',
				city: 'Sugar Land',
				state: 'TX',
				zip_code: '77479'
			})
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
	it( 'should reject invalid last name', done => {
		request( app )
			.post( '/user/settings' )
			.send({ 
				first_name: 'Bo Gum', 
				last_name: '',  
				address1: '123 Test Street',
				address2: '',
				city: 'Sugar Land',
				state: 'TX',
				zip_code: '77479'
			})
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
	it( 'should reject invalid address', done => {
		request( app )
			.post( '/user/settings' )
			.send({ 
				first_name: 'Bo Gum', 
				last_name: 'Park', 
				address1: '',
				address2: '',
				city: 'Sugar Land',
				state: 'TX',
				zip_code: '77479'
			})
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
	it( 'should accept empty address2', done => {
		request( app )
			.post( '/user/settings' )
			.send({ 
				first_name: 'Bo Gum', 
				last_name: 'Park',  
				address1: '123 Test Street',
				address2: '',
				city: 'Sugar Land',
				state: 'TX',
				zip_code: '77479'
			})
			.set( 'Accept', 'application/json' )
			.expect( 302, done );
	});
	it( 'should reject invalid city', done => {
		request( app )
			.post( '/user/settings' )
			.send({ 
				first_name: 'Bo Gum', 
				last_name: 'Park',  
				address1: '123 Test Street',
				address2: '',
				city: '',
				state: 'TX',
				zip_code: '77479'
			})
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
	it( 'should reject invalid state', done => {
		request( app )
			.post( '/user/settings' )
			.send({ 
				first_name: 'Bo Gum', 
				last_name: 'Park',
				address1: '123 Test Street',
				address2: '',
				city: 'Sugar Land',
				state: 'TXXX',
				zip_code: '77479'
			})
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
	it( 'should reject invalid zip code', done => {
		request( app )
			.post( '/user/settings' )
			.send({ 
				first_name: 'Bo Gum', 
				last_name: 'Park', 
				address1: '123 Test Street',
				address2: '',
				city: 'Sugar Land',
				state: 'TXXX',
				zip_code: '777'
			})
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
});

describe( 'GET /request-quote', ( ) => {
	it( 'should render quote request page', done => {
		request( app )
			.get( '/request-quote' )
			.expect( 200, done );
	});
});

describe( 'POST /request-quote', ( ) => {
	it( 'should accept valid request form', done => {
		request( app )
			.post( '/request-quote' )
			.send({ 
				gallons: '100', 
				date_delivery: '2021-08-31T00:00:00.000Z', 
				suggested_price: '500',
				amount_due: '500.01',
			})
			.set( 'Accept', 'application/json' )
			.expect( 302, done );
	});
	it( 'should reject invalid gallons', done => {
		request( app )
		.post( '/request-quote' )
			.send({ 
				gallons: '', 
				date_delivery: '2021-08-31T00:00:00.000Z', 
				suggested_price: '500',
				amount_due: '500.01',
			})
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
	it( 'should reject invalid suggested price', done => {
		request( app )
		.post( '/request-quote' )
			.send({ 
				gallons: '100', 
				date_delivery: '2021-08-31T00:00:00.000Z', 
				suggested_price: '',
				amount_due: '500.01',
			})
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
	it( 'should reject invalid amount due', done => {
		request( app )
		.post( '/request-quote' )
			.send({ 
				gallons: '100', 
				date_delivery: '2021-08-31T00:00:00.000Z', 
				suggested_price: '500',
				amount_due: '',
			})
			.set( 'Accept', 'application/json' )
			.expect( 400, done );
	});
})

describe( 'GET /customers', ( ) => {
	it( 'should render customers page', done => {
		request( app )
			.get( '/customers' )
			.expect( 200, done );
	});
});

describe( 'GET /quotes', ( ) => {
	it( 'should render quotes page', done => {
		request( app )
			.get( '/quotes' )
			.expect( 200, done );
	});
});

describe( 'GET /invoices', ( ) => {
	it( 'should render invoices page', done => {
		request( app )
			.get( '/invoices' )
			.expect( 200, done );
	});
});

describe( 'GET /payments', ( ) => {
	it( 'should render payments page', done => {
		request( app )
			.get( '/payments' )
			.expect( 200, done );
	});
});

describe( 'GET /users', ( ) => {
	it( 'should render users page', done => {
		request( app )
			.get( '/users' )
			.expect( 200, done );
	});
});