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
// model
userScehma.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password=hash;
    next();
});

// userScehma.method.isAuthenticated = function (password) {
//     return bcrypt.compare(password, this.password);
//   };

const User = mongoose.model('User', userScehma);
//export model
module.exports = User;