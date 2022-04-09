const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost/lets-connect');

mongoose.set('debug', true);

app.listen(PORT, () =>
  console.log(`You are now connected to localhost:${PORT}`)
);
