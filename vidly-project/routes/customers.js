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
        const result = await customer.save();
        res.send(result);
    } catch (error) {
        res.status(400).send(`Error - ${error}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
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
        await Customer.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send('Updated Successfully.');
    } catch (error) {
        res.status(400).send(`Customer Not Found || Potential Server Error - ${error}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.status(200).send('Deleted Successfully.');
    } catch (error) {
        res.status(400).send(`Customer Not Found || Potential Server Error - ${error}`);
    }
});

module.exports = router;