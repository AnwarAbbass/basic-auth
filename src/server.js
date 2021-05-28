'use strict';
//express 
const express = require('express');
const mongoose = require('mongoose');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const morgan = require ('morgan');
const bodyParser = require('body-parser');

const router = require('./auth/router.js'); //import
const app = express();
//morgan 
app.use(morgan('dev')); 
// Process JSON input and put the data on req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//router 
app.use('/',router);

//export
module.exports = {
  app,
  start: (port) => {
    const PORT = port || 3000;
    app.listen(PORT, () => console.log(`the server is up on ${PORT}`));
  },
};