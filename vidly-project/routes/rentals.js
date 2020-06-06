const { Rental, validateRental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../model/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const rentals = await Rental
        .find()
        .sort('-dateOut');
    
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);
        return res.status(400).send(`Error(s): ${errors.join(', ')}`);
    }

    let customer;
    try {
        customer = await Customer.findById(req.body.customerId);
        
        if (!customer) {
            return res.status(400).send('Customer Not Found.');
        }
    } catch (error) {
        return res.status(400).send(`Customer Not Found || Possible Server Error - ${error}`);
    }    

    let movie;
    try {
        movie = await Movie.findById(req.body.movieId);
        
        if (!movie) {
            return res.status(400).send('Movie Not Found.');
        }

        if (movie.numberInStock === 0) {
            return res.status(400).send('Movie Not In Stock.');
        }
    } catch (error) {
        return res.status(400).send(`Movie Not Found || Possible Server Error - ${error}`);
    }

    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        const result = rental.save();

        movie.numberInStock--;
        movie.save();

        res.send(result);
    } catch (error) {
        res.status(400).send(`Error - ${error}`);
    }
});