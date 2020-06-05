const express = require('express');
const Joi = require('joi');
const router = express.Router();

const genres = [
    { id: 1, name: 'Thriller' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Action' }
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(genreObject => genreObject.id === parseInt(req.params.id));

    if (!genre) {
        return res.status(400).send('Genre Not Found.');
    } else {
        res.send(genre);
    }
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);

        return res.status(400).send(error.join(', '));
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);

    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genreToEdit = genres.find(genreObject => genreObject.id === parseInt(req.params.id));

    if (!genreToEdit) {
        return res.status(400).send('Genre Not Found.');
    }

    const { error } = validateGenre(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);

        return res.status(400).send(errors.join(', '));
    }

    genreToEdit.name = req.body.name;

    res.send(genreToEdit);
});

router.delete('/:id', (req, res) => {
    const genreToDelete = genres.find(genreObject => genreObject.id === parseInt(req.params.id));

    if (!genreToDelete) {
        return res.status(400).send('Genre Not Found.');
    }

    const { error } = validateGenre(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);

        return res.status(400).send(errors.join(', '));
    }

    const index = genres.indexOf(genreToDelete);

    genres.splice(index, 1);

    res.send(genreToDelete);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

module.exports = router;