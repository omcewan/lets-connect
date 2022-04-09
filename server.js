const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.connect('mongodb://localhost/lets-connect');

mongoose.set('debug', true);

app.listen(PORT, () =>
  console.log(`You are now connected to localhost:${PORT}`)
);
