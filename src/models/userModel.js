
const bcrypt = require('bcrypt');
const connection = require('../dbconfig');

exports.insertUser = async ({ email, password, callback }) => {
	const hash = await bcrypt.hash(password, 10);
	connection.beginTransaction((err) => {
		if (err) {
			throw err;
		}
		const values = { password: hash };
		connection.query('INSERT INTO UserCredentials SET ?', values, (error, results, fields) => {
			if (error) {
				return connection.rollback(() => {
					throw error;
				});
			}
			// error will be an Error if one occurred during the query
			// results will contain the results of the query
			// fields will contain information about the returned results fields (if any)
			var userId = results.insertId;
			connection.query('INSERT INTO ClientInformation SET ID = ?, email = ?', [userId, email], (error, results, fields) => {
				if (error) {
					return connection.rollback(() => {
						throw error;
					});
				}
				connection.commit((err) => {
					if (err) {
						return connection.rollback(() => {
							throw err;
						});
					}
					console.log(`Successfully inserted new user with id #${userId} and email: ${email}.`);
					callback({
						id: userId,
						email,
					});
				});
			});
		});
	});
};

exports.updateUser = ({ full_name, address1, address2, city, state, zip_code }) => {

};