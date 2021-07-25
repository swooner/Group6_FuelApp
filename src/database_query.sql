DROP DATABASE fueldb;
CREATE DATABASE IF NOT EXISTS fueldb
CHARACTER SET utf8mb4;
USE fueldb;
CREATE TABLE role (
	ID INT NOT NULL,
    role_name VARCHAR(100),
    role_description VARCHAR(100),
    PRIMARY KEY (ID)
);

CREATE TABLE UserCredential(
	ID BIGINT NOT NULL AUTO_INCREMENT,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID)
);
CREATE TABLE UserLogin(
	ID BIGINT NOT NULL,
    token TEXT,
	updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(ID),
	FOREIGN KEY (ID) REFERENCES UserCredential(ID) ON DELETE CASCADE
);
 CREATE TABLE ClientInformation (
    ID BIGINT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company VARCHAR(100),
	email VARCHAR(255) UNIQUE NOT NULL, 
    phone_number VARCHAR(30),
    street_number VARCHAR(255),
    street_name VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    country VARCHAR(200) DEFAULT 'United States',
    photo_url VARCHAR(512) DEFAULT '/img/user_profile.jpg',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    role_ID INT DEFAULT 2,
    profile_percentage FLOAT8 DEFAULT 0.0,
	FOREIGN KEY (ID) REFERENCES UserCredential(ID) ON DELETE CASCADE,
	FOREIGN KEY (role_ID) REFERENCES role(ID)
);
CREATE TABLE Fuel_Quote (
    ID BIGINT NOT NULL AUTO_INCREMENT, 
    ClientInformation_ID BIGINT NOT NULL,
    gallons FLOAT,
    delivery_date DATE,
    suggested_price FLOAT,
    amount_due FLOAT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    valid_until DATE,
    quote_status VARCHAR(128),
    PRIMARY KEY(ID),
    FOREIGN KEY (ClientInformation_ID) REFERENCES ClientInformation(ID) ON DELETE CASCADE
) ENGINE = INNODB;
INSERT INTO role (ID,role_name,role_description) VALUES (1,'administrator', 'Get full access'),(2,'customer','Only Profile, Settings, Request Quotes allowed');