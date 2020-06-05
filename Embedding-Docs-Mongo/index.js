const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully Connected to MongoDB...'))
    .catch(error => console.error('Error in Connecting to MongoDB -', error));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const courseSchema = new mongoose.Schema({
    name: String,
    author: {
        type: authorSchema,
        required: true
    }
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

async function updateAuthor(courseId) {
    //const course = await Course.findById(courseId);
    //course.author.name = 'Mosh Hamedani';
    //course.save();
    await Course.updateOne({ _id: courseId }, {
        $set: {
            'author.name': 'Skylord2'
        }
    });
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));
updateAuthor('5edaaaf95a2e6d31de6ed4f9');