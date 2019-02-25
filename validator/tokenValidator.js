const Jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

//Exporting the JWT Middlewares
module.exports.generateToken = generateToken;
module.exports.validateToken = validateToken;

//To generate the JWT token - Payload -> (id,email)
function generateToken(req, res) {
    const payload = {
        id: res.locals.userID,
        email: res.locals.email
    };
    Jwt.sign(payload, CONFIG.SECRET_KEY, (err, token) => {
        if (err) {
            console.log(err.message);
            res.json(CONFIG.defaultErrorJSON);
        } else {
            const responseObject = {
                ...CONFIG.defaultJSON
            }
            responseObject.data = {
                token: token
            };
            res.send(responseObject);
        }
    });
}

//To validate the recieved token with the SECRET_KEY
function validateToken(req, res, next) {
    Jwt.verify(req.body.token, CONFIG.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(err.message);
            res.json({
                statusCode: 400,
                message: "Invalid Token, please login again",
                data:null
            });
        } else {
            req.decoded = decoded;
            next();
        }
    });
}