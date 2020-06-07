const mongoose = require('mongoose');
const { genreSchema } = require('./genre');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validationMovie(movie) {
    const schema = {
        title: Joi.string().min(2).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    };

    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validationMovie = validationMovie;