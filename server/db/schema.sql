DROP DATABASE IF EXISTS voyages_db;
CREATE DATABASE voyages_db;
USE voyages_db;

CREATE TABLE users
(
    userId INT NOT NULL
    AUTO_INCREMENT=1000 PRIMARY KEY,
    userName VARCHAR
    (30) NOT NULL UNIQUE,
    userEmail VARCHAR
    (30) NOT NULL UNIQUE,
    userPassword VARCHAR
    (30) NOT NULL,
);

    CREATE TABLE voyages
    (
        userId INT NOT NULL,
        voyageId INT NOT NULL
        AUTO_INCREMENT=1000000 PRIMARY KEY,
        voyageName VARCHAR
        (30) NOT NULL,
        FOREIGN KEY
        (userId) REFERENCES users
        (userId)
        ON
        DELETE CASCADE
    );

        CREATE TABLE log
        (
            voyageId INT NOT NULL PRIMARY KEY,
            logDate DATE NOT NULL,
            latidue VARCHAR(10) NOT NULL,
            longitude VARCHAR(10) NOT NULL,
            heading INT,
            notes TEXT,
            FOREIGN KEY (voyageId) REFERENCES voyages(voyageId)
            ON DELETE CASCADE
        );