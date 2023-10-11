const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});
//Connection to MYSQL Database

const db = mysql.createConnection({
    host: process.env.db_HOST,
    user: process.env.db_USER,
    password: process.env.db_PASSWORD,
    database: process.env.db_DATABASE
});

module.exports = db;