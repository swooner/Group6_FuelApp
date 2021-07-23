
const connection = require( '../dbconfig' );
const { verifyToken } = require('../models/userModel');

exports.insertQuote = async ({
    gallons,
    delivery_date,
    suggested_price,
    amount_due,
    token,
    callback 
}) => {
    const decoded = verifyToken( token );
    const values = { ClientInformation_ID: decoded.id, gallons, delivery_date, suggested_price, amount_due };
    connection.query( 'INSERT INTO Fuel_Quote SET ?', values, ( error, results, fields ) => {
        if ( error ) {
            return connection.rollback( () => {
                throw error;
            });
        }
        console.log( 'Successfully inserted new quote!' );
        callback({
            user: decoded
        });
    });
};

exports.getQuotes = async ({
    user,
    callback 
}) => {
    const sql = `
        SELECT *
        FROM Fuel_Quote
        WHERE
            ClientInformation_ID = ?
    `;
    connection.query( sql, user.ID, ( error, results, fields ) => {
        if ( error ) {
            return connection.rollback( () => {
                throw error;
            });
        }
        // console.log( 'results:', results );
        callback({
            quotes: results
        });
    });
};
