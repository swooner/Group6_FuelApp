
const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' );

chai.should();
chai.use( chaiHttp );

const user = {
    email: 'n@n.com',
    password: 'Pass1!word'
};
const userId = 85;

exports.user = user;
exports.userId = userId;
exports.chai = chai;