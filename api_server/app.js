const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

const tournamentRoutes = require('./api/routes/tournaments');
const userRoutes = require('./api/routes/user');
const divisionRoutes = require('./api/routes/division');
const gameRoutes = require('./api/routes/game');
const locationRoutes = require('./api/routes/location');
const playerRoutes = require('./api/routes/player');
const teamRoutes = require('./api/routes/team');
const predictRoutes = require("./api/routes/predict");

app.use('/tournaments', tournamentRoutes);
app.use('/user', userRoutes);
app.use('/divisions', divisionRoutes);
app.use('/games', gameRoutes);
app.use('/locations', locationRoutes);
app.use('/players', playerRoutes);
app.use('/teams', teamRoutes);
app.use("/predict", predictRoutes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});
  
app.use((req, res, next) => {
    const error = new Error("Route Not Found");
    error.status = 404;
    next(error);
});
  
app.use((error, req, res, next) => {
    res.state = error.status || 500;
    res.json({
      error: {
        message: error.message,
      }
    });
});
  
module.exports = app;
