const db = require("../dbconfig");
const bcrypt = require('bcryptjs');

exports.findAllUser = async () => {
    const sqlQuery = `SELECT * FROM ClientInformation`;
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (error, result) => {
            if (error) {
                return reject(error);
            };
            return resolve(result);
        });
    });
}



exports.findUser = (email) => {
    const sqlQuery = `SELECT * FROM ClientInformation JOIN UserCredential ON ClientInformation.ID = UserCredential.ID JOIN role ON role.ID = ClientInformation.role_ID WHERE email ='${email}' ;`;
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (error, result) => {
            if (error) {
                return reject(error);
            };
            return resolve(result);
        });
    });
};


exports.findUserById = async (id) => {
    const sqlQuery = `SELECT * FROM ClientInformation JOIN UserCredential ON ClientInformation.ID = UserCredential.ID JOIN role ON role.ID = ClientInformation.role_ID WHERE ClientInformation.ID ='${id}' ;`;
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (error, result) => {
            if (error) {
                return reject(error);
            };
            return resolve(result);
        });
    });
};

const createPasswordCredential = async (password) => {
    const sqlQuery = `INSERT INTO UserCredential(password) VALUES('${password}');`
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (error, result) => {
            if (error) {
                return reject(error);
            };
            return resolve(result);
        });
    });
}

exports.createCredential = async (email, password) => {
    const hashPassword = await bcrypt.hash(password, 15);
    const createdPassword = await createPasswordCredential(hashPassword);
    const sqlQuery = `INSERT INTO ClientInformation(ID,email) VALUES(${createdPassword.insertId},'${email}');`
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (error, result) => {
            if (error) {
                return reject(error);
            };
            return resolve(result);
        });
    });
};



exports.updateUserInformation = async (id, userInfo) => {
    const sqlQuery = `UPDATE ClientInformation
    SET 
        first_name = '${userInfo.first_name}',
        last_name = '${userInfo.last_name}',
        company = '${userInfo.company}',
        email = '${userInfo.email}',
        phone_number = '${userInfo.phone_number}',
        street_number = '${userInfo.street_number}',
        street_name = '${userInfo.street_name}',
        city = '${userInfo.city}',
        state = '${userInfo.state}',
        zip_code = '${userInfo.zip_code}',
        country = '${userInfo.country}',
        profile_percentage = ${userInfo.profile_percentage}
    WHERE
        ID = ${id};`;
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (error, result) => {
            if (error) {
                return reject(error);
            };
            return resolve(result);
        });
    });
}

exports.findQuoteHistory = async (id) => {
    const sqlQuery = `SELECT * FROM ClientInformation JOIN Fuel_Quote ON ClientInformation.ID = Fuel_Quote.ClientInformation_ID WHERE ClientInformation.ID = '${id}';`;
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, (error, result) => {
            if (error) {
                return reject(error);
            };
            return resolve(result);
        });
    });
}