const movies = require('./routes/movies');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Successfully Connected to MongoDB...'))
    .catch(error => console.error('Failed to Connect to MongoDB -', error));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on Port ${port}...`));