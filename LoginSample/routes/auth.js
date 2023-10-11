const express = require('express');
const authController = require('../controllers/auth');
const route = express.Router();


//ROUTES
//POST METHOD

route.post('/login', authController.login);

//END OF ROUTES

module.exports = route;