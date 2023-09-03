DROP DATABASE IF EXISTS voyages_db;
CREATE DATABASE voyages_db;
USE voyages_db;

CREATE TABLE users
(
    userId INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR
    (30) NOT NULL,
    userEmail VARCHAR
    (30) NOT NULL,
    userPassword VARCHAR
    (30) NOT NULL
);

    ALTER TABLE users AUTO_INCREMENT = 1000;

    CREATE TABLE voyages
    (
        userId INT NOT NULL,
        voyageId INT NOT NULL
        AUTO_INCREMENT PRIMARY KEY,
        voyageName VARCHAR
        (30) NOT NULL
        -- FOREIGN KEY
        -- (userId) REFERENCES users
        -- (userId)
        -- ON
        -- DELETE CASCADE
    );

        ALTER TABLE voyages AUTO_INCREMENT = 1000000;

        CREATE TABLE log
        (
            voyageId INT NOT NULL PRIMARY KEY,
            logDate DATE NOT NULL,
            latitude VARCHAR(20) NOT NULL,
            longitude VARCHAR(20) NOT NULL,
            heading INT,
            notes TEXT
            -- FOREIGN KEY (voyageId) REFERENCES voyages(voyageId)
            -- ON DELETE CASCADE
        );