const express = require('express');
const cors = require('cors');

const app = require('./app');

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});