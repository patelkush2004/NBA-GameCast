-- Active: 1706748847163@@localhost@null
CREATE TABLE NBA_GameCast.users (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    email VARCHAR(320) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE NBA_GameCast.tournaments (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    startTime DATETIME,
    endTime DATETIME,
    roundRobinDuration INT,
    playoffDuration INT,
    quarterFinalDuration INT,
    semiFinalDuration INT,
    finalDuration INT,
    PRIMARY KEY (id)
);