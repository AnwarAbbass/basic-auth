'use strict';
//setup 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// schema
const userScehma = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
//method 
userScehma.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password=hash;
    next();
});

// model
module.exports = mongoose.model('user', userScehma);