const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Get all tournaments
router.get('/', (req, res) => {
    connection.query('SELECT * FROM tournaments', (err, results) => {
        if (err) {
            console.log('Error retrieving tournaments from database: ', err);
        } else {
            res.json(results);
            res.send(results);
        }
    })
});

module.exports = router;