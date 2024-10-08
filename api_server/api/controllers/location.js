const mysqlConnection = require("../../connection");
const Location = require("../models/location");

exports.getAllLocations = (req, res, next) => {
  const query = "SELECT * FROM locations";
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting all locations failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully received all locations.");
      res.status(200).json(rows);
    }
  });
};

exports.postLocation = (req, res, next) => {
  const newLocation = new Location({
    id: null,
    name: req.body.name,
    description: req.body.description,
  });
  const query = "INSERT INTO locations SET ?";

  mysqlConnection.query(query, newLocation, (err, result) => {
    if (err) {
      console.log("Inserting new location failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully inserted new location.");
      res.status(201).json({
        message: "Successfully inserted new location.",
      });
    }
  });
};

exports.getLocation = (req, res, next) => {
  const query = "SELECT * FROM locations WHERE id = " + req.params.locationId;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting location failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully received location.");
      res.status(200).json(rows[0]);
    }
  });
};

exports.patchLocation = (req, res, next) => {
  const query = "UPDATE locations SET ? where id = " + req.params.locationId;

  mysqlConnection.query(query, req.body, (err, result) => {
    if (err) {
      console.log("Patching location failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully patched location.");
      res.status(200).json({
        message: "Successfully patched location.",
      });
    }
  });
};

exports.deleteLocation = (req, res, next) => {
  const query = "DELETE FROM locations WHERE id = " + req.params.locationId;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Deleting location failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully deleted location.");
      res.status(200).json({
        message: "Successfully deleted location.",
      });
    }
  });
};