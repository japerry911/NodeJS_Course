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

router.get('/:id', async(req, res) => {
    try {
        const movie = await Movie
            .findById(req.params.id)
            .populate('genre');

        if (!movie) {
            return  res.send('Movie Not Found.');
        }

        res.send(movie);
    } catch (error) {
        res.send(`Movie Not Found || Possible Server Error - ${error}`);
    }
});

router.put('/:id', async(req, res) => {
    const { error } = validationMovie(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);
        return res.status(400).send(`Error(s): ${errors.join(', ')}`);
    }

    try {
        const result = await Movie.findByIdAndUpdate(req.params.id, req.body);
        
        if (!result) {
            return res.status(400).send('Movie Not Found.');
        }

        res.status(200).send('Updated Successfully.');
    } catch (error) {
        res.status(400).send(`Movie Not Found || Potential Server Error - ${error}`);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const result = await Movie.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(400).send('Movie Not Found.');
        }

        res.status(200).send('Deleted Successfully.');
    } catch (error) {
        res.status(400).send(`Movie Not Found || Potential Server Error - ${error}`);
    }
});

module.exports = router;