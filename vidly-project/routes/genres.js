const { validateGenre, Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

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
    try {
        const genre = await Genre.findById(req.params.id);
        res.send(genre);
    } catch (error) {
        res.send(`Genre Not Found || Possible Server Error - ${error}`);
    }
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

module.exports = router;