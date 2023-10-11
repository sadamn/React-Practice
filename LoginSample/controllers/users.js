const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env'});

function checkLogin(req,res){
    const userToken = req.cookies.userToken;
    if (!userToken) return res.render('error');
}

//GET USERS
exports.getUsers = (req,res) =>{

    const userToken = req.cookies.userToken;

    if (!userToken) {
        res.render('error');
    } else{        const decodedToken = jwt.verify(userToken, process.env.SECRETKEY);
        if(decodedToken.privelege !='admin'){
            res.redirect('/dashboard')} 
            else{
                db.query('SELECT * FROM tblusers', async (error, results) =>{
                    if (error) throw error
                       return res.json(results)
                })
            }
        }
};


//CREATE USERS
exports.createUsers = (req,res) =>{

    //Check IF LOGIN
    checkLogin(req,res);

    const {employeeID, name, email,  username} = req.body;
    // console.log(req.body)
    db.query('SELECT employeeID FROM tblusers WHERE employeeID = ?', [employeeID], async (error, results) =>{
        if(error) throw error;
        if(results.length > 0){
            return db.query('SELECT * FROM tblusers', async (error, results) =>{
                if (error) throw error
                    const message = 'Error! Employee ID already exists'
                    const flag='error'
                    return res.json({message, flag})
            })
        } 
        else{ 
            //console.log(process.env.DEFAULT_PASSWORD);
            let hashedPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD, 8);

            const q='INSERT INTO tblusers SET ?'
            const value = {
                employeeID:employeeID,
                name:name,
                email:email,
                username:username,
                password:hashedPassword
            }
            
            db.query( await q,value, (error,results) =>{

                if(error) {
                    console.log(error);
                } 
                
                else{
                    const q='SELECT * FROM tblusers'
                    return db.query(q, async (error, results) =>{
                        if (error) throw error
                        const message = 'User Successfully Added'
                        return res.json({message})   
                    })
                }
            });
        }
    });
    
};

//UPDATE USERS
exports.updateUsers = async (req,res) =>{
        //console.log(req.body.update)
        //Check IF LOGIN

        checkLogin(req,res);

        if (req.body.update == 'true') {
           const {employeeID, name, email, username} = req.body

            const q ="UPDATE tblusers SET name = ?, email=?, username=? WHERE employeeID=?"
            const value = [name, email, username, employeeID]

                db.query(q, value, async (error,results) => {
                  if(error) throw error;
                    console.log("User " + req.params.employeeID + " successfully Updated")
                  })
        } else{
            let hashedPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD, 8);
            const q ="UPDATE tblusers SET password=? WHERE employeeID=?"
            const value = [hashedPassword, req.params.employeeID]
            
            db.query(q, value, async (error,results) => {
                  if(error) throw error;
                  console.log("User " + req.params.employeeID + " password reset")
            })
        }
    //res.redirect('/users')
};


//DELETE USERS
exports.deleteUsers = (req,res) =>{
    //Check IF LOGIN
    checkLogin(req,res);
    const q="DELETE from tblusers WHERE employeeID = ?"
    const value = req.params.employeeID

    db.query(q, value, async (error,results) => {
        if(error) throw error;
    })
};