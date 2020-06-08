const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { validateUser, User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);
        return res.status(400).send(`Error(s): ${errors.join(', ')}`);
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).send('User already registered.');
    }

    const user = new User(_.pick(req.body, ['name', 'email', 'password']));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
        const result = await user.save();
        const token = user.generateAuthToken();

        res.header('x-auth-token', token).send(_.pick(result, ['_id', 'name', 'email']));        
    } catch (error) {
        res.status(400).send(`Server Error: ${error}`);
    }
});

module.exports = router;