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
    (1001, "Anacapa Island"),
    (1002, "Santa Cruz Island");

INSERT INTO Log
    (voyageId, logDate, latitude, longitude, heading, notes)
VALUES
    (1000000, "2023-09-01", "33° 43.3987 N", "118° 11.0188 W", 232, "Fair Winds!"),
    (1000001, "2023-09-01", "33° 26.9491 N", "118° 29.6037 W", 333, "Fair Winds!"),
    (1000002, "2023-09-01", "33° 27.7843 N", "118° 29.8885 W", 305, "Fair Winds!");