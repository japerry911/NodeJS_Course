const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 50,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(50).required()
    };

    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;