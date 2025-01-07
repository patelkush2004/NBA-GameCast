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

CREATE TABLE NBA_GameCast.divisions (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(50) NOT NULL,
    tournamentId INT NOT NULL,
    FOREIGN KEY (tournamentId) REFERENCES NBA_GameCast.Tournaments(id)
);

CREATE TABLE NBA_GameCast.teams (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(50) NOT NULL,
    divisionId INT NOT NULL,
    FOREIGN KEY (divisionId) REFERENCES NBA_GameCast.divisions(id)
);

CREATE TABLE NBA_GameCast.players (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(50) NOT NULL,
    teamId INT NOT NULL,
    FOREIGN KEY (teamId) REFERENCES NBA_GameCast.teams(id)
);

CREATE TABLE NBA_GameCast.locations (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE NBA_GameCast.games (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    sport VARCHAR(50) NOT NULL,
    startTime DATETIME,
    endTime DATETIME,
    winnerId INT,
    type VARCHAR(50),
    team1Id INT NOT NULL,
    team2Id INT NOT NULL,
    team1Score INT,
    team2Score INT,
    locationId INT,
    tournamentId INT,
    seasonId INT,
    homeTeamId INT,
    FOREIGN KEY (winnerId) REFERENCES NBA_GameCast.teams(id),
    FOREIGN KEY (team1Id) REFERENCES NBA_GameCast.teams(id),
    FOREIGN KEY (team2Id) REFERENCES NBA_GameCast.teams(id),
    FOREIGN KEY (homeTeamId) REFERENCES NBA_GameCast.teams(id),
    FOREIGN KEY (locationId) REFERENCES NBA_GameCast.locations(id),
    FOREIGN KEY (tournamentId) REFERENCES NBA_GameCast.tournaments(id)
);

CREATE TABLE NBA_GameCast.teamStandings (
    teamRank INT NOT NULL,
    teamName VARCHAR(50),
    wins INT,
    losses INT,
    seasonId INT,
    teamId INT
);