DROP DATABASE IF EXISTS voyages_db;
CREATE DATABASE voyages_db;
USE voyages_db;

CREATE TABLE Users
(
    userId INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR
    (30) NOT NULL UNIQUE,
    userEmail VARCHAR
    (30) NOT NULL UNIQUE,
    userPassword VARCHAR
    (100) NOT NULL
);

    ALTER TABLE Users AUTO_INCREMENT = 1000;

    CREATE TABLE Voyages
    (
        userId INT NOT NULL,
        voyageId INT NOT NULL
        AUTO_INCREMENT PRIMARY KEY,
        voyageName VARCHAR
        (30) NOT NULL,
        FOREIGN KEY
        (userId) REFERENCES Users
        (userId) ON
        DELETE CASCADE
    );

        ALTER TABLE Voyages AUTO_INCREMENT = 1000000;

        CREATE TABLE Log
        (
            voyageId INT NOT NULL,
            logDate DATE NOT NULL,
            latitude VARCHAR(20) NOT NULL,
            longitude VARCHAR(20) NOT NULL,
            heading INT,
            notes TEXT,
            FOREIGN KEY (voyageId) REFERENCES Voyages(voyageId) ON DELETE CASCADE
        );