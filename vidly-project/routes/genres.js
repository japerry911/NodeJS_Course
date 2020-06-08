const auth = require('../middleware/auth');
const { validateGenre, Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres =  await Genre
        .find();

    res.send(genres);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateGenre(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);
        res.status(400).send(`Error(s): ${errors.join(', ')}`);
    }

    const genre = new Genre(req.body);

    try {
        await genre.save();
        res.send(genre);
    } catch (error) {
        res.status(400).send(`Error - ${error}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        
        if (!genre) {
            return res.send('Genre Not Found');
        }
        
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
        const result = await Genre.findByIdAndUpdate(req.params.id, req.body);

        if (!result) {
            return res.status(400).send('Genre Not Found.');
        }

        res.status(200).send('Updated Successfully.');
    } catch (error) {
        res.status(400).send(`Genre Not Found || Potential Server Error - ${error}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Genre.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(400).send('Genre Not Found.');
        }

        res.status(200).send('Deleted Successfully.');
    } catch (error) {
        res.status(400).send(`Genre Not Found || Potential Server Error - ${error}`)
    }
});

module.exports = router;