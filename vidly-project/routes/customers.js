const { validateCustomer, Customer } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer
        .find();
    
    res.send(customers);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);
        return res.status(400).send(`Error(s): ${errors.join(', ')}`);
    }

    const customer = new Customer(req.body);

    try {
        await customer.save();
        res.send(customer);
    } catch (error) {
        res.status(400).send(`Error - ${error}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.send('Customer Not Found.');
        }

        res.send(customer);
    } catch (error) {
        res.send(`Customer Not Found || Possible Server Error - ${error}`);
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);
        return res.status(400).send(`Error(s): ${errors.join(', ')}`);
    }

    try {
        const result = await Customer.findByIdAndUpdate(req.params.id, req.body);

        if (!result) {
            return res.status(400).send('Customer Not Found.');
        }

        res.status(200).send('Updated Successfully.');
    } catch (error) {
        res.status(400).send(`Customer Not Found || Potential Server Error - ${error}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Customer.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(400).send('Customer Not Found.');
        }

        res.status(200).send('Deleted Successfully.');
    } catch (error) {
        res.status(400).send(`Customer Not Found || Potential Server Error - ${error}`);
    }
});

module.exports = router;