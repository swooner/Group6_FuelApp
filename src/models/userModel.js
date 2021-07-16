class User {
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
};

let nextUserId = 0;
exports.addUser = (email, password) => {
    const user = new User(
        `${nextUserId++}`,
        email,
        password,
    );
    return user;
};

exports.updateUser = ({ full_name, address1, address2, city, state, zip_code }) => {

};