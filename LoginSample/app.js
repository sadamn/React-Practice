const express = require('express');
const path = require('path');
const hbs = require('hbs');
const jsPDF = require('jspdf');
const html2canvas = require('html2canvas');

const cookieParser = require('cookie-parser');
const app = express();

//DB CONNECTION
const db = require('./db');

//AppPages HBS
const publicDirectory = path.join(__dirname, './');
const partialsPath = path.join(__dirname, './views/partial');
app.use(express.static(publicDirectory));


//PARSE URL ENCODED (sent by HTML Forms)
app.use(express.urlencoded({ extended: false}));

//PARSE JSON bodies (as sent by API)
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/', require('./routes/pages'));
// app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'))
app.use('/profile', require('./routes/profile'))
// Use the cookie-parser middleware

//app.use("/api", require("./controllers/auth"));
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

hbs.registerHelper('ifeq', function(a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
});

//Test Connect
db.connect( (error) => {
    if (error) {
        console.log(error)
    } else{
        console.log("MYSQL Connected")
    }
});


//Start Server
app.listen(8080, () => {
    console.log("server started")
});
