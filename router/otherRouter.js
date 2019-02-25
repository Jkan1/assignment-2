const express = require('express');
const router = express.Router();
const otherController = require('../controller/otherController');

module.exports = router;

//Middleware
router.use(function (req, res, next) {
    console.log("2> From /other");
    next();
});

//Defining routes for API
router.get('/callback/:one&:two&:three', (req, res) => {
    otherController.callbackReadFileFunction(req, res);
});
router.get('/async-await/:one&:two&:three', (req, res) => {
    otherController.readFileAsyncFunction.readFileAsyncAwait(req, res);
});
router.get('/promises/:one&:two&:three', (req, res) => {
    Promise.all([
        otherController.readFilePromise("./files/" + req.params.one + ".txt"),
        otherController.readFilePromise("./files/" + req.params.two + ".txt"),
        otherController.readFilePromise("./files/" + req.params.three + ".txt")
    ]).then((result) => {
        const response = {
            statusCode: 400,
            message: "success",
            data: {
                fromPromises: result.toString()
            }
        }
        res.json(response);
    }).catch((err) => {
        const response = {
            statusCode: 400,
            error: err.message,
            data: null
        }
        res.json(response);
    });
});
router.get('/genfunction/:one&:two&:three', (req, res) => {
    try {
        const iterator = otherController.readFileGenFunc([
            req.params.one,
            req.params.two,
            req.params.three,
        ]);
        Promise.all([
            iterator.next().value,
            iterator.next().value,
            iterator.next().value
        ]).then(result => {
            if (iterator.next().done) {
                const response = {
                    statusCode: 400,
                    message: "success",
                    data: {
                        fromGeneratorFunction: result.toString()
                    }
                }
                res.json(response);
            }
        });
    } catch (err) {
        const response = {
            statusCode: 400,
            error: err.message,
            data: null
        }
        res.json(response);
    }
});
router.get('/waterfall/:one&:two&:three', (req, res) => {
    otherController.readFileAsyncFunction.readFileWaterfall(req, res);
});
router.get('/parallel/:one&:two&:three', (req, res) => {
    otherController.readFileAsyncFunction.readFileParallel(req, res);
});
router.get('/series/:one&:two&:three', (req, res) => {
    otherController.readFileAsyncFunction.readFileSeries(req, res);
});