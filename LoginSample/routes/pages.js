const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const login = require('../controllers/login')
const fs = require('fs');
const cookieParser = require('cookie-parser');


//ROUTES

//Start Page
//For Home Page
route.get("/", (req,res) => {
    const userToken = req.cookies.userToken;
    if (!userToken) {
        res.render('index');
        res.clearCookie('userToken');
    } else{
        res.redirect('/dashboard');
    }
});

//CHECK ACCOUNT
route.get("/login/:employeeID", login.login)

route.get("/dashboard",(req,res) => {
    const userToken = req.cookies.userToken;

    if (!userToken) {
        // Token not present, handle as needed (e.g., redirect to login)
        return res.redirect('/');
    } else{

    const decodedToken = jwt.verify(userToken, process.env.SECRETKEY);
    const selectedView = req.query.view || 'home';
    
    const userInfo = {
        employeeID: decodedToken.employeeID,
        username : decodedToken.username,
        name : decodedToken.name,
        email: decodedToken.email,
        privelege: decodedToken.privelege
    }

        if(selectedView == 'profile') return res.render('profile', userInfo);
        res.render('dashboard', userInfo)
    }

});

route.get("/signout", (req,res) => {
    res.clearCookie('userToken');
    res.redirect('/');
});

route.get('/error', (req, res) =>{
    res.render('error')
})

// route.get('*', (req, res) => {
//     res.render('error');
//   });

//END OF ROUTES

module.exports = route;