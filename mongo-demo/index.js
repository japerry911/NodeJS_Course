const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected'))
    .catch(error => console.error('Failed to connect -', error));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ], 
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        // .find({ author: 'Mosh', isPublished: true })
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        // .find({ price: { $gte: 10, $lte: 20 } })
        // .find({ price: { $in: [10, 15, 20] } })
        // .find()
        // .or([{ author: 'Mosh' }, { isPublished: true } ])
        // .and([{ author: 'Mosh' }, { isPublished: true }])
        // .find({ author: /^.*os.*$/ })
        .find()
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
        // .countDocuments();
    console.log(courses);
}

async function updateCourse1(id) {
    //Approach 1: Query First
    // findById()
    // Modifiy it's properties
    // save()
    const course = await Course.findById(id);

    if (!course) {
        return;
    }

    // course.isPublished = true;
    // course.author = 'Another Author';
    course.set({
        isPublished: false,
        author: 'Another Author'
    });

    const result = await course.save();
    console.log(result);
}

async function updateCourse2(id) {
    // Approach 2: Update first
    // Update directly
    // Optionally: get the updated document
    /*const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Moshh',
            isPublished: false
        }
    })*/

    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Skylord2',
            isPublished: false
        }
    }, { new: true });

    console.log(result);
}

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    const result = await Course.findByIdAndRemove(id);
    console.log(result);
}

//getCourses();
//updateCourse1('5eda75a5be8fbda1d27e0f45');
//updateCourse2('5eda75a5be8fbda1d27e0f45');
removeCourse('5eda75a5be8fbda1d27e0f47');