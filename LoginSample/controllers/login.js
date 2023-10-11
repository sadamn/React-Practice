//DB CONNECTION
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env'});

//LOGIN
exports.login = (req,res) =>{
    
    const userToken = req.cookies.userToken;
    if (userToken) return res.render('error');

    // const {employeeID, password} = req.body;
    db.query('SELECT * FROM tblusers WHERE employeeID = ?', [req.params.employeeID], async (error, results) =>{
        if(error) throw error;
        if(!results.length || !await bcrypt.compare(password, results[0].password)){
            //return res.json({ status: 'error', error: 'Email already exists!' });
                return  res.render('index', {
                error: 'Employee ID or Password did not match'
            });
        } else{
            // User authentication successful, create a JWT token
            const tokenData = {
                employeeID : results[0].employeeID,
                username: results[0].username,
                name: results[0].name,
                email: results[0].email,
                privelege: results[0].privelege
            };


            // Set the token as a cookie with an appropriate expiration time
            // const token = jwt.sign(tokenData, 'your-secret-key', {
            //     expiresIn: 60 * 60 * 1000 // Token expires in 1 hour (adjust as needed)
            // });
            const token = jwt.sign(tokenData, process.env.SECRETKEY);

            res.cookie('userToken', token, {
                httpOnly: true,
                expires: new Date(0), // Expires immediately
                expires: 0 // Token expires when the browser is closed
            });

            return res.redirect('/dashboard');
        }
    });
};