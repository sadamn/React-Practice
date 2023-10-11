const express = require('express');
const route = express.Router();
const profile = require('../controllers/profile')

//Home Page
route.get('/', profile.getProfile)

module.exports = route;