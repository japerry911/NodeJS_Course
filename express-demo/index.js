const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(courseObject => courseObject.id === parseInt(req.params.id));

    if (!course) {
        return res.status(404).send('Course Not Found.');
    } else {
        res.send(course);
    }
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);

        return res.status(400).send(errors.join(', '));
    }

    /*if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name is required & should be minimum 3 characters.');
        return;
    }*/

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);

    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const courseToEdit = courses.find(courseObject => courseObject.id === parseInt(req.params.id));

    if (!courseToEdit) {
        return res.status(404).send('Course Not Found.');
    }

    const { error } = validateCourse(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);

        return res.status(400).send(errors.join(', '));
    }

    courseToEdit.name = req.body.name;
    res.send(courseToEdit);
});

app.delete('/api/courses/:id', (req, res) => {
    const courseToDelete = courses.find(courseObject => courseObject.id === parseInt(req.params.id));

    if (!courseToDelete) {
        return res.status(404).send('Course Not Found.');
    }

    const index = courses.indexOf(courseToDelete);
    
    courses.splice(index, 1);
    res.send(courseToDelete);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const validationResult = Joi.validate(course, schema);

    return validationResult;
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));