const { validationMovie, Movie } = require('../models/movie');
const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');

router.get('/', async (req, res) => {
    const movies = await Movie
        .find();
    
    res.send(movies);
});

router.post('/', async (req, res) => {
    const { error } = await validationMovie(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);
        return res.status(400).send(`Error(s): ${errors.join(', ')}`);
    }

    const genre = await Genre.findById(req.body.genreId);
        
    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

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
        const result = await Movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });
        
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