const { validationMovie, Movie } = require('../models/movie');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie
        .find()
        .populate('genre');
    
    res.send(movies);
});

router.post('/', async (req, res) => {
    const { error } = await validationMovie(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);
        return res.status(400).send(`Error(s): ${errors.join(', ')}`);
    }

    const movie = new Movie(req.body);

    try {
        const result = await movie.save();
        res.send(result);
    } catch (error) {
        res.status(400).send(`Error - ${error}`);
    }
});

module.exports = router;