const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.error('Error connecting to Mongo DB:', error));

const courseSchema = new mongoose.Schema({
    tags: [ String ],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getMethod1() {
    const courses = await Course
        .find({ tags: { $in: ['backend'] }, isPublished: true })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
    
    return courses;
}

/*getMethod1()
    .then(response => console.log(response))
    .catch(error => console.error('Error in getMethod1:', error));*/

async function getMethod2() {
    const courses = await Course
        .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
        // .or([{ tags: 'frontend' }, { tags: 'backend' }])
        .sort({ price: -1 })
        .select({ name: 1, author: 1 });
    
    return courses;
}

getMethod2()
    .then(response => console.log(response))
    .catch(error => console.error('Error in getMethod2:', error));