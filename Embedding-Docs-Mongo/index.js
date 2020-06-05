const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Successfully Connected to MongoDB...'))
    .catch(error => console.error('Error in Connecting to MongoDB -', error));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const courseSchema = new mongoose.Schema({
    name: String,
    author: authorSchema
});

const Author = mongoose.model('Author', authorSchema);
const Course = mongoose.model('Course', courseSchema);

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();

    console.log(result);
}

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();

    console.log(result);
}

async function listCourses() {
    const courses = await Course
        .find();
    
    console.log(courses);
}