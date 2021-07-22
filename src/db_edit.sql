CREATE DATABASE IF NOT EXISTS fueldb
CHARACTER SET utf8mb4;
USE fueldb;

CREATE TABLE UserCredentials (
	ID INT NOT NULL AUTO_INCREMENT,
    password BINARY(60) NOT NULL,
    PRIMARY KEY ( ID )
) ENGINE = INNODB;

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

 CREATE TABLE ClientInformation (
    ID INT NOT NULL,
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
    FOREIGN KEY (ID) REFERENCES UserCredentials(ID) ON DELETE CASCADE
);