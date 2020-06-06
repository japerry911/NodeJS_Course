const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                required: true
            },
            phone: {
                type: String,
                required: false,
                minlength: 12,
                maxlength: 12
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
            },
            dailyRentalRate: {
                type: Number,
                required: true
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturn: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    };

    return Joi.validate(rental, schema);
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;