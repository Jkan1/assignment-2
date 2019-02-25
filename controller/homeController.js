const CONFIG = require('../config/config');
const connection = require('../service/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Exporting functions
module.exports.logInUser = logInUser;
module.exports.deleteUser = deleteUser;
module.exports.createUser = createUser;

//Constant Query Strings
const insertQuery = "INSERT INTO users( email, name, password ) VALUES ( ?, ?, ?)";
const selectQuery = "SELECT * FROM users WHERE email=?";
const deleteQuery = "DELETE FROM users WHERE id=?";

//When user tries to login with email and password
function logInUser(req, res, next) {
    console.log("3> From /home/login");
    connection.query(selectQuery, [req.body.email], (err, row, fields) => {
        if (err) {
            console.log(err.message);
            res.json(CONFIG.defaultErrorJSON);
        }
        if (row[0]) {
            bcrypt.compare(req.body.password, row[0].password, (err, same) => {
                if (err) {
                    console.log(err.message);
                    res.json(CONFIG.defaultErrorJSON);
                }
                if (same) {
                    console.log(row[0].email + " is logged in");
                    res.locals.userID = row[0].id;
                    res.locals.email = row[0].email;
                    next();
                } else {
                    console.log("Password did not match.");
                    res.json({
                        statusCode: 400,
                        message: "password did not match",
                        data: null
                    });
                }
            });
        } else {
            console.log("User-email Not Found!");
            res.json({
                statusCode: 400,
                message: "user-email Not Found!",
                data: null
            });
        }
    });
}

//When user with a valid token requests to delete (with id)
function deleteUser(req, res) {
    console.log("3> From /home/delete:id");
    connection.query(deleteQuery, [req.params.id], (err, row, fields) => {
        if (err) {
            console.log(err.message);
            res.json(CONFIG.defaultErrorJSON);
        }
        if (row.affectedRows < 1) {
            console.log("Delete : Id not found , ID : " + req.params.id);
            const response = {
                statusCode: 400,
                err: "invalid user id, id not found",
                data: null
            }
            res.json(response);
        } else {
            console.log("User Deleted");
            const response = {
                statusCode: 200,
                message: "User Deleted",
                data: null
            }
            res.json(response);
        }
    });
}

//When user tries to create account with signup
function createUser(req, res) {
    console.log("3> From /home/signup");
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                console.log(err.message);
                res.json(CONFIG.defaultErrorJSON);
                throw err("Bcrypt hash could not be generated.");
            }
            connection.query(insertQuery, [req.body.email, req.body.name, hash], function (err, rows, fields) {
                if (err) {
                    console.log(err.message);
                    res.json({
                        statusCode: 400,
                        message: "Email already registered",
                        data: null
                    });
                } else {
                    console.log("User Created");                  
                    res.json({
                        statusCode: 201,
                        message: "User Created",
                        data: null
                    });
                }
            });
        });
    });
}