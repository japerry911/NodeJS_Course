const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    { id: 1, name: 'Thriller' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Action' }
];

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(genreObject => genreObject.id === parseInt(req.params.id));

    if (!genre) {
        return res.status(400).send('Genre Not Found.');
    } else {
        res.send(genre);
    }
});

app.post('/api/genres', (req, res) => {
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

app.put('/api/genres/:id', (req, res) => {
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

app.delete('/api/genres/:id', (req, res) => {
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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on Port ${port}...`));