const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: String,
        required: false,
        minlength: 12,
        maxlength: 12
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean().required(),
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().length(12)
    };

    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;