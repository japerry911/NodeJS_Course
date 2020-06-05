const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.error('Error connecting to MongoDB -', error));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String
}))
async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = author.save();

    console.log(result);
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author 
    })
}

async function listCourses() {
    const courses = await Course
        .find()
        .select({ name: 1 });

    console.log(courses);
}