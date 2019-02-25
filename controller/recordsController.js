const CONFIG = require('../config/config');
const connection = require('../service/database');

//Exporting functions
module.exports.getData = getData;
module.exports.showData = showData;

//Query string constants
const selectAllQuery = "SELECT name FROM users;"
const selectDataQuery = "SELECT * FROM users WHERE id=?;"

//Send the array of names of all the users in database
function getData(req, res) {
    console.log("3> From /records/users");

    connection.query(selectAllQuery, (err, row, fields) => {
        if (err) {
            console.log(err.message);
            res.json(CONFIG.defaultErrorJSON);
        }
        console.log(row);
        let allUsers = [];
        for(let object of row){
            allUsers.push(object.name);
        }
        let responseObject = {...CONFIG.defaultJSON};
        responseObject.data = {users:allUsers};
        res.json(responseObject);
    });
}

//If token is valid, send all data of the logged in user
function showData(req, res) {
    console.log("3> From /records/data");
    connection.query(selectDataQuery,[req.decoded.id], (err, row, fields) => {
        if (err) {
            console.log(err.message);
            res.json(CONFIG.defaultErrorJSON);
        }
        console.log(row[0]);
        res.json(row[0]);
    });
}