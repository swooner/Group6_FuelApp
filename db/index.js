
import Sequelize from  'sequelize';

const database = new Sequelize( 
    'fueldb', // database name
    'noble', // user name
    'chansey', // password
    {
        host: 'fueldb-instance1.cnd9beqdlozb.us-east-1.rds.amazonaws.com',
        dialect: 'mysql',
    } 
);

database
    .authenticate( )
    .then( ( ) => {
        console.log( 'Connection has been established successfully.' );
    })
    .catch( err => {
        console.error( 'Unable to connect to the database:', err ) ;
    });

export default database;







// const database = new Sequelize( 'peacelovebs', 'noble', 'pass', {
//     host: 'peacelovebs_db_1',
//     dialect: 'mysql'
// });