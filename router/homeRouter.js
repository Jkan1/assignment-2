const express = require('express');
const router = express();
const homeController = require('../controller/homeController');
const inputValidator = require('../validator/inputValidator');
const tokenValidator = require('../validator/tokenValidator');

module.exports = router;

//Middleware
router.use(function (req, res, next) {
    console.log("2> From /home");
    next();
})

//Defining routes with validators
router.put('/login',            inputValidator.validateLoginInput,      homeController.logInUser,   tokenValidator.generateToken);
router.put('/signup',           inputValidator.validateInput,           homeController.createUser   );
router.delete('/delete/:id',    tokenValidator.validateToken,           homeController.deleteUser   );