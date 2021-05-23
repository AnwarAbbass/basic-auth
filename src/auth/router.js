'use strict';
const express = require('express');
const router = express.Router();
const base64 = require('base-64');
const User = require('./models/users-model.js');//model
const signin = require('./middleware/basic');

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        const record = await user.save();
        res.status(201).json(record);
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
});

router.post('/signin', signin, async (req, res) => {
    try {

        res.json({user: req.user});

    } catch (error) { res.status(403).send('Invalid Login'); }
});


module.exports = router;