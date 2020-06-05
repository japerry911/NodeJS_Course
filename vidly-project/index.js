const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Successfully Connected to MongoDB...'))
    .catch(error => console.error('Failed to Connect to MongoDB -', error));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on Port ${port}...`));