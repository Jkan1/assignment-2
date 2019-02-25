const express = require('express');
const router = express.Router();
const recordsController = require('../controller/recordsController');

const tokenValidator = require('../validator/tokenValidator');

module.exports = router;

//Middleware
router.use(function(req,res,next){
    console.log("2> From /records");
    next();
});

//Defining routes with validator
router.get('/users',        recordsController.getData       );
router.post('/data',        tokenValidator.validateToken,   recordsController.showData);
