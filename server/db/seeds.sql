INSERT INTO Users
    (userName, userEmail, userPassword)
VALUES
    ("CaptAndrew", "andrew@test.com", "test1234"),
    ("CaptJim", "jim@test.com", "test1234"),
    ("CaptHaddy", "haddy@test.com", "test1234");

INSERT INTO Voyages
    (uId, voyageName)
VALUES
    (1000, "Catalina"),
    (1001, "The Channel Islands"),
    (1002, "Mission Bay");

INSERT INTO Log
    (voyageId, logDate, latitude, longitude, heading, notes)
VALUES
    (1000000, "2023-09-01", "33° 43.3987 N", "118° 11.0188 W", 232, "Fair Winds & Calm Seas!"),
    (1000000, "2023-09-01", "33° 26.9491 N", "118° 29.6037 W", 333, "Fair Winds & Calm Seas!"),
    (1000000, "2023-09-01", "33° 27.7843 N", "118° 29.8885 W", 305, "Fair Winds & Calm Seas!"),
    (1000001, "2023-09-01", "34° 14.7472 N", "119° 16.3923 W", 194, "Buy low, sell high, and lean down river!"),
    (1000001, "2023-09-01", "34° 00.5254 N", "119° 24.5155 W", 317, "Buy low, sell high, and lean down river!"),
    (1000001, "2023-09-01", "34° 01.2180 N", "119° 25.0466 W", 257, "Buy low, sell high, and lean down river!"),
    (1000002, "2023-09-01", "32° 37.3008 N", "117° 14.8499 W", 306, "I heart SD!"),
    (1000002, "2023-09-01", "32° 41.6193 N", "117° 19.5791 W", 008, "I heart SD!"),
    (1000002, "2023-09-01", "32° 45.2255 N", "117° 18.0910 W", 074, "I heart SD!");