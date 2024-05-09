const express = require('express');
const bodyParser = require('body-parser');

const tournamentRoutes = require('./routes/tournaments');

const app = express();

app.use(bodyParser.json());
app.use('/tournaments', tournamentRoutes);

module.exports = app;