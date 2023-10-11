const express = require('express');
const route = express.Router();
const users = require('../controllers/users')


// const jsPDF = require('jspdf');
// const html2canvas = require('html2canvas');


//ROUTES

//Start Page
//For Home Page
route.get('/', (req, res) =>{
    res.render('users')
})

route.get("/all", users.getUsers);

// route.get('/:employeeID',users.getUserByID)

//Create Users
route.post('/', users.createUsers);

//Update
route.patch('/:employeeID',users.updateUsers)

//DELETE
route.delete('/:employeeID', users.deleteUsers)
// (req,res)=>{
//     const employeeID = req.params.employeeID
//     console.log('Deleted')
// })


// route.get('*', (req, res) => {
//     res.render('error');
//   });

//END OF ROUTES

module.exports = route;