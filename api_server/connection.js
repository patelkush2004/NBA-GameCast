const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'nba_user',
    password: 'password1234_',
    database: 'NBA_GameCast',
    multipleStatements: true,
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to database', err.message);
        return;
    }
    console.log('Connected to database');
}
);

module.exports = connection;
// This file is used to establish a connection to the MySQL database. It exports the connection object so that it can be used in other files.