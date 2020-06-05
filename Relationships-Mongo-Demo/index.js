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
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();

    console.log(result);
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author 
    })

    const result = await course.save();

    console.log(result);
}

async function listCourses() {
    const courses = await Course
        .find()
        .populate('author', 'name -_id bio')
        .select({ name: 1, author: 1 });

    console.log(courses);
}

// createAuthor('Skylord', 'a great dog', 'dog.com');
// createCourse('Dog Course', '5edaa8164a7bc830687885d5');
listCourses();