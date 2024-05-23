const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Get all tournaments
router.get('/', (req, res) => {
    const query = 'SELECT * FROM tournaments';
    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Error retrieving tournaments from database: ', err);
        } else {
            res.send(rows);
        }
    })
});

router.post('/', (req, res, next) => {
    res.status(201).json({
      message: "Handling POST request to tournaments"
    });
  });
  
router.get('/:tournamentId', (req, res, next) => {
    const id = req.params.tournamentId;
    if (id === "special") {
      res.status(200).json({
        message: "You selected the special id"
      });
    } else {
      res.status(200).json({
        message: "You passed a normal id"
      });
    }
});
  
router.patch('/:tournamentId', (req, res, next) => {
    res.status(200).json({
      message: "PATCHED a tournament"
    });
  });
  
router.delete('/:tournamentId', (req, res, next) => {
    res.status(200).json({
      message: "DELETED a tournament"
    });
});

module.exports = router;