const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Successfully Connected to MongoDB...'))
    .catch(error => console.error('Failed to Connect to MongoDB -', error));

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);

router.get('/', async (req, res) => {
    const genres =  await Genre
        .find();

    res.send(genres);
});

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);
        res.status(400).send(`Error(s): ${errors.join(', ')}`);
    }

    const genre = new Genre(req.body);

    try {
        const result = await genre.save();
        res.send(result);
    } catch (error) {
        res.status(400).send(`Error - ${error}`);
    }
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
        return res.status(400).send('Genre Not Found.');
    }

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);
        res.status(400).send(`Error(s): ${errors.join(', ')}`);
    }

    try {
        await Genre.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send('Updated Successfully.');
    } catch (error) {
        res.status(400).send(`Genre Not Found || Potential Server Error - ${error}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Genre.findByIdAndDelete(req.params.id);
        res.status(200).send('Deleted Successfully.');
    } catch (error) {
        res.status(400).send(`Genre Not Found || Potential Server Error - ${error}`)
    }
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    };

    return Joi.validate(genre, schema);
}

module.exports = router;