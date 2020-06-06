const Joi = require('joi');
const mongoose = require('mongoose');
const { Genre, genreSchema } = require('./genre');

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

async function validationMovie(movie) {
    try {
        const genre = await Genre.findById(movie.genreId).countDocuments();
        if (!genre) {
            return { error: { details: [{ message: 'Genre does not exist.' }]}};
        }
    } catch (error) {
        return { error: { details: [{ message: 'Genre does not exist.' }]}};
    }

    const schema = {
        title: Joi.string().min(2).max(50).required(),
        genreId: Joi.required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    };

    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validationMovie = validationMovie;