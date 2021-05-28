'use strict';
const express = require('express');
const router = express.Router();
const base64 = require('base-64');
const bcrypt = require('bcrypt');

const User = require('./models/users-model.js');//model
const basic = require('./middleware/basic');

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        const record = await user.save();
        res.status(201).json(record);
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
});

router.post('/signin', basic , async (req, res) => {
    try {
       res.status(200).json({user: req.user});
    } catch (error) { res.status(403).send('Invalid Login'); }
});


module.exports = router;