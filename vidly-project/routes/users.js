const { validateUser, User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);

    if (error) {
        const errors = error.details.map(errorObject => errorObject.message);
        return res.status(400).send(`Error(s): ${errors.join(', ')}`);
    }

    const user = new User(req.body);

    try {
        const result = await user.save();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(`Server Error: ${error}`);
    }
});

module.exports = router;