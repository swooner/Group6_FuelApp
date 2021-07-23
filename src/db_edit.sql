DROP DATABASE fueldb;
CREATE DATABASE IF NOT EXISTS fueldb
CHARACTER SET utf8mb4;
USE fueldb;

CREATE TABLE UserCredentials (
	ID INT NOT NULL AUTO_INCREMENT,
    password BINARY(60) NOT NULL,
    PRIMARY KEY ( ID )
) ENGINE = INNODB;

 CREATE TABLE ClientInformation (
    ID INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email_address VARCHAR(255) UNIQUE, 
    phone_number VARCHAR(255),
    street_number VARCHAR(255),
    street_name VARCHAR(255),
    city VARCHAR(255),
    state CHAR(2),
    zip_code VARCHAR(10),
    photo_url VARCHAR(512),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    profile_percentage FLOAT8,
    FOREIGN KEY (ID) REFERENCES UserCredentials(ID) ON DELETE CASCADE
);
CREATE TABLE Fuel_Quote (
ID BIGINT NOT NULL AUTO_INCREMENT, 
ClientInformation_ID INT,
quantity FLOAT,
total FLOAT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
valid_until DATETIME,
quote_status VARCHAR(128),
PRIMARY KEY(ID),
FOREIGN KEY (ClientInformation_ID) REFERENCES ClientInformation(ID)
) ENGINE = INNODB;


USE fueldb;
SELECT * FROM ClientInformation;
INSERT INTO  UserCredentials (password) VALUES('somepassword');
INSERT INTO ClientInformation (first_name,last_name,email_address,phone_number,street_number,street_name,city,state,zip_code,photo_url) VALUES('Tony','Hoang','tt.hoang2108@gmail.com','7133672499','181818','somestreet st','houston','tx','77000','/img/user_profile.jpg');
SELECT * FROM ClientInformation LEFT JOIN UserCredentials ON ClientInformation.ID = UserCredentials.ID;
SELECT * FROM ClientInformation WHERE ID = 1;

