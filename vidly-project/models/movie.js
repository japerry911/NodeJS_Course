const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
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

function movieValidation(movie) {
    const schema = {
        title: Joi.string().min(2).max(50).required(),
        genre: Joi.ref().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    };

    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.movieValidation = movieValidation;