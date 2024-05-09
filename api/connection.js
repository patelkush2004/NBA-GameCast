const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'NBA-GameCast',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to database');
        return;
    }
    console.log('Connected to database');
}
);

module.exports = connection;
// This file is used to establish a connection to the MySQL database. It exports the connection object so that it can be used in other files.