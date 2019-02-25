const Joi = require('joi');
const CONFIG = require('../config/config');

//Exporting the functions (or middlewares)
module.exports.validateInput = validateInput;
module.exports.validateLoginInput = validateLoginInput;

//To validate the signup input - (email,name,password)
function validateInput(req, res, next) {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string().min(6).max(25).required()
    });
    Joi.validate(req.body, schema, (err, value) => {
        if (err) {
            console.log(err.message);
            res.json({
                statusCode: 400,
                message: err.details[0].message,
                data: null
            });
        } else {
            next();
        }
    });
}

//To validate the login input - (email,password)
function validateLoginInput(req, res, next) {
    const loginSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    Joi.validate(req.body, loginSchema, (err, value) => {
        if (err) {
            console.log(err.message);
            res.json({
                statusCode: 400,
                message: err.details[0].message,
                data: null
            });
        } else {
            next();
        }
    });
}