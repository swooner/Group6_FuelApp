
DROP DATABASE fueldb;
CREATE DATABASE IF NOT EXISTS fueldb
CHARACTER SET utf8mb4;
USE fueldb;

CREATE TABLE UserCredentials (
	ID INT NOT NULL AUTO_INCREMENT,
    password BINARY(60) NOT NULL,
    PRIMARY KEY ( ID )
) ENGINE = INNODB;

CREATE TABLE quote (quoteId int, 
subject varchar(255), 
validUntil datetime,
customerId int,
PRIMARY KEY(quoteId)
) ENGINE = INNODB;


 
 CREATE TABLE ClientInformation (
    ID INT NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email_address VARCHAR(255) UNIQUE, 
    phone_number VARCHAR(255),
    address1 VARCHAR(255),
    address2 VARCHAR(255),
    city VARCHAR(255),
    state CHAR(2),
    zip_code VARCHAR(10),
    FOREIGN KEY (ID) REFERENCES UserCredentials(ID) ON DELETE CASCADE
);