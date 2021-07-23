
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const connection = require( '../dbconfig' );

exports.insertUser = async ({ email, password, callback }) => {
    const hash = await bcrypt.hash( password, 10 );
	connection.beginTransaction( ( err ) => {
		if ( err ) { 
			throw err; 
		}
		const values = { password: hash };
		connection.query( 'INSERT INTO UserCredentials SET ?', values, ( error, results, fields ) => {
			if ( error ) {
				return connection.rollback( () => {
					throw error;
				});
			}
			// error will be an Error if one occurred during the query
			// results will contain the results of the query
			// fields will contain information about the returned results fields (if any)
			var userId = results.insertId;
			connection.query( 'INSERT INTO ClientInformation SET ID = ?, email = ?', [ userId, email ], ( error, results, fields ) => {
				if ( error ) {
					return connection.rollback( ( ) => {
						throw error;
					});
				}
				connection.commit( ( err ) => {
					if ( err ) {
						return connection.rollback( ( ) => {
							throw err;
						});
					}
					console.log( `Successfully inserted new user with id #${ userId } and email: ${ email }.`  );
					callback({
						id: userId,
						email,
					});
				});
			});
		});
	});
};

const createLoginToken = async ({ ID, email }) => {
	return await jwt.sign(
        { id: ID, email }, 
        'a-secret-key'
    );
};

exports.getToken = ( req, res, next ) => {
	console.log( 'req.headers:', req.headers );
    const bearerHeader = req.headers[ 'Authorization' ];
	console.log( 'bearerHeader:', bearerHeader );
    if ( typeof bearerHeader !== 'undefined' ) {
        const bearer = bearerHeader.split( ' ' );
        const bearerToken = bearer[ 1 ];
        req.token = bearerToken;
    }
	next();
};

exports.verifyToken = ( token ) => {
	console.log( 'token:', token );
	if ( !token ) {
		return;
	}
	return jwt.verify( token, 'a-secret-key' );
}

exports.loginUser = async ({ email, password, callback }) => {
	connection.beginTransaction( ( err ) => {
		if ( err ) { 
			throw err; 
		}
		const sql = `
			SELECT UserCredentials.*, ClientInformation.email
			FROM ClientInformation
			INNER JOIN UserCredentials 
				ON UserCredentials.ID = ClientInformation.ID
			WHERE email = '${ email }';
		`;
		console.log( 'sql:', sql );
		connection.query( sql, async ( error, results, fields ) => {
			if ( error ) {
				return connection.rollback( () => {
					throw error;
				});
			}
			const user = results[ 0 ];
			console.log( 'user:', user );
			if ( !user ) {
				console.log( 'No user with that email exists.' );
				callback({ error: 'NO_USER' });
			}
			else {
				const userId = user.ID;
				const match = await bcrypt.compare( password, user.password );
				console.log( 'match:', match );
				if ( match ) {
					const token = await createLoginToken( user );
					console.log( 'token:', token );
					const sql2 = `
						INSERT INTO UserLogin( ID, token ) 
						VALUES ( '${ userId }', '${ token }' ) 
						ON DUPLICATE KEY UPDATE token = token
					`;
					connection.query( sql2, ( error, results, fields ) => {
						if ( error ) {
							return connection.rollback( ( ) => {
								throw error;
							});
						}
						connection.commit( ( err ) => {
							if ( err ) {
								return connection.rollback( ( ) => {
									throw err;
								});
							}
							console.log( `Successfully inserted new user login for user with id #${ userId }.`  );
							callback({
								token
							});
						});
					});
				}
				else {
					res.sendStatus( 400 )
				}
			}
		});
	});
};

exports.updateUser = ({ full_name, address1, address2, city, state, zip_code }) => {

};

exports.getAllUser = async () => {
	let sql_query = `SELECT * FROM ClientInformation;`;
	connection.query(sql_query, (err, result, fields) => {
		if (err) throw err;
	});

};
exports.getOneUser = async (userID) => {
	let sql_query = `SELECT * FROM ClientInformation WHERE ID=${userID};`;
	connection.query(sql_query, (err, result, fields) => {
		if (err) throw err;
	});

};