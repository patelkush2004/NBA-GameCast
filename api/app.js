const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

const tournamentRoutes = require('./routes/tournaments');
const userRoutes = require('./routes/user');
const divisionRoutes = require('./routes/division');
const gameRoutes = require('./routes/game');
const locationRoutes = require('./routes/location');
const playerRoutes = require('./routes/player');
const teamRoutes = require('./routes/team');

app.use('/tournaments', tournamentRoutes);
app.use('/user', userRoutes);
app.use('/divisions', divisionRoutes);
app.use('/games', gameRoutes);
app.use('/locations', locationRoutes);
app.use('/players', playerRoutes);
app.use('/teams', teamRoutes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
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
        message: error.message
      }
    });
});
  
module.exports = app;
