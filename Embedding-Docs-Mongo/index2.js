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
    authors: [authorSchema]
});

const Author = mongoose.model('Author', authorSchema);
const Course = mongoose.model('Course', courseSchema);

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
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

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);

    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);

    const author = course.authors.id(authorId);
    
    author.remove();
    course.save();
}

/*createCourse('Node Course', [
    new Author({ name: 'Mosh' }),
    new Author({ name: 'Sky' })
]);*/

// addAuthor('5edaad464c2a2332b1e9fbaf', new Author({ name: 'Jack' }));
removeAuthor('5edaad464c2a2332b1e9fbaf', '5edaadb6ecde7532d02a9a42');