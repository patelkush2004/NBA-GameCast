const express = require('express');
const router = express.Router();
const connection = require('../connection');
const Tournament = require('../models/tournaments');

// Get all tournaments
router.get('/', (req, res) => {
    const query = 'SELECT * FROM tournaments';
    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Error retrieving tournaments from database: ', err);
            res.sendStatus(500).json({
              error: err
            });
        } else {
            console.log('Tournaments retrieved from database: ', rows);
            res.status(200).json({
              tournaments: rows
            });
        }
    })
});

router.post("/", (req, res, next) => {
  const newTournament = new Tournament({
    id: null,
    name: req.body.name,
    description: req.body.description,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    roundRobinDuration: req.body.roundRobinDuration,
    playoffDuration: req.body.playoffDuration,
    quarterFinalDuration: req.body.quarterFinalDuration,
    semiFinalDuration: req.body.semiFinalDuration,
    finalDuration: req.body.finalDuration
  });
  const query = "INSERT INTO tournaments SET ?";

  connection.query(query, newTournament, (err, result) => {
    if (err) {
      console.log("Inserting new tournament failed.");
      res.status(500).json({
        error: err
      });
    } else {
      console.log("Successfully inserted new tournament.");
      res.status(201).json({
        message: "Successfully inserted new tournament."
      });
    }
  });
});
  
router.get('/:tournamentId', (req, res, next) => {
  const query = "SELECT * FROM tournaments WHERE id = " + req.params.tournamentId;

  connection.query(query, (err, rows, fields) => {
  if (err) {
    console.log("Getting tournament failed.");
    res.status(500).json({
      error: err
    });
  } else {
    console.log("Successfully received tournament.");
    res.status(200).json(rows[0]);
  }
  });
}); 
  
router.patch('/:tournamentId', (req, res, next) => {
  const query =
  "UPDATE tournaments SET ? where id = " + req.params.tournamentId;

  connection.query(query, req.body, (err, result) => {
    if (err) {
      console.log("Patching tournament failed.");
      res.status(500).json({
        error: err
      });
    } else {
      console.log("Successfully patched tournament.");
      res.status(200).json({
        message: "Successfully patched tournament."
      });
      }
    });
  });
  
router.delete('/:tournamentId', (req, res, next) => {
  const query = "DELETE FROM tournaments WHERE id = " + req.params.tournamentId;
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Deleting tournament failed.");
      res.status(500).json({
        error: err
      });
    } else {
      console.log("Successfully deleted tournament.");
      res.status(200).json({
        message: "Successfully deleted tournament."
      });
    }
  });
});

module.exports = router;