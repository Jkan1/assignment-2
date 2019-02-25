const mysql = require('mysql');
const CONFIG = require('../config/config');

//Connection object with constant values from CONFIG File
const connection = mysql.createConnection({
        host    :   CONFIG.DB_HOST,
        user    :   CONFIG.DB_USER,
        password:   CONFIG.DB_PASSWORD,
        database:   CONFIG.DB_NAME
});

//Exporting the connection object
module.exports = connection;