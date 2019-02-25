const fs = require('fs');
const async = require('async');
//Requiring the promise object
const readFilePromise = require('./readFilePromise');

//Exporting all functions 
module.exports.readFileAsyncAwait = readFileAsyncAwait;
module.exports.readFileWaterfall = readFileWaterfall;
module.exports.readFileParallel = readFileParallel;
module.exports.readFileSeries = readFileSeries;

//File reading with Async - Await 
async function readFileAsyncAwait(req, res) {
    try {
        const content = await Promise.all([
            readFilePromise("./files/" + req.params.one + ".txt"),
            readFilePromise("./files/" + req.params.two + ".txt"),
            readFilePromise("./files/" + req.params.three + ".txt")
        ]);
        const response = {
            statusCode: 200,
            message: "success",
            data: {
                fromAsyncAwait: content.toString()
            }
        }
        await res.json(response);
        console.log("Response Sent");
    } catch (err) {
        const response = {
            statusCode: 400,
            error: err,
            data: null
        }
        res.json(response);
    }
}

//File reading with Async - Waterfall 
function readFileWaterfall(req, res) {
    async.waterfall([
        readFirstFile,
        readSecondFile,
        readThirdFile,
    ], function (err, fulllContent) {
        if (err) {
            const response = {
                statusCode: 400,
                error: err,
                data: null
            }
            res.json(response);
        }
        const response = {
            statusCode: 200,
            message: success,
            data: {
                fromAsyncWaterfall: fulllContent.toString()
            }
        }
        res.json(response);
    });

    function readFirstFile(callback) {
        fs.readFile("./files/" + req.params.one + ".txt", {}, (err, contentOne) => {
            if (err) {
                console.log(err.message);
                const response = {
                    statusCode: 400,
                    error: err,
                    data: null
                }
                res.json(response);
            }
            callback(null, contentOne);
        });
    }

    function readSecondFile(passedData, callback) {
        fs.readFile("./files/" + req.params.two + ".txt", {}, (err, contentTwo) => {
            if (err) {
                console.log(err.message);
                const response = {
                    statusCode: 400,
                    error: err,
                    data: null
                }
                res.json(response);
            }
            callback(null, passedData + contentTwo);
        });
    }

    function readThirdFile(passedData, callback) {
        fs.readFile("./files/" + req.params.three + ".txt", {}, (err, contentThree) => {
            if (err) {
                console.log(err.message);
                const response = {
                    statusCode: 400,
                    error: err,
                    data: null
                }
                res.json(response);
            }
            callback(null, passedData + contentThree);
        });
    }
}

//File reading with Async - Parallel
function readFileParallel(req, res) {
    async.parallel([
            function (callback) {
                fs.readFile("./files/" + req.params.one + ".txt", {}, (err, contentOne) => {
                    if (err) {
                        console.log(err.message);
                        const response = {
                            statusCode: 400,
                            error: err,
                            data: null
                        }
                        res.json(response);
                    }
                    callback(null, contentOne);
                })
            },
            function (callback) {
                fs.readFile("./files/" + req.params.two + ".txt", {}, (err, contentTwo) => {
                    if (err) {
                        console.log(err.message);
                        const response = {
                            statusCode: 400,
                            error: err,
                            data: null
                        }
                        res.json(response);
                    }
                    callback(null, contentTwo);
                })
            },
            function (callback) {
                fs.readFile("./files/" + req.params.three + ".txt", {}, (err, contentThree) => {
                    if (err) {
                        console.log(err.message);
                        const response = {
                            statusCode: 400,
                            error: err,
                            data: null
                        }
                        res.json(response);
                    }
                    callback(null, contentThree);
                })
            }
        ],
        // Callback
        function (err, results) {
            if (err) {
                console.log(err.message);
                const response = {
                    statusCode: 400,
                    error: err,
                    data: null
                }
                res.json(response);
            }
            const response = {
                statusCode: 200,
                message: success,
                data: {
                    fromAsyncParallel: results.toString()
                }
            }
            res.json(response);
        });
}

//File reading with Async - Series
function readFileSeries(req, res) {
    async.series([
            function (callback) {
                fs.readFile("./files/" + req.params.one + ".txt", {}, (err, contentOne) => {
                    if (err) {
                        console.log(err.message);
                        const response = {
                            statusCode: 400,
                            error: err,
                            data: null
                        }
                        res.json(response);
                    }
                    callback(null, contentOne);
                })
            },
            function (callback) {
                fs.readFile("./files/" + req.params.two + ".txt", {}, (err, contentTwo) => {
                    if (err) {
                        console.log(err.message);
                        const response = {
                            statusCode: 400,
                            error: err,
                            data: null
                        }
                        res.json(response);
                    }
                    callback(null, contentTwo);
                })
            },
            function (callback) {
                fs.readFile("./files/" + req.params.three + ".txt", {}, (err, contentThree) => {
                    if (err) {
                        console.log(err.message);
                        const response = {
                            statusCode: 400,
                            error: err,
                            data: null
                        }
                        res.json(response);
                    }
                    callback(null, contentThree);
                })
            }
        ],
        // Callback
        function (err, results) {
            if (err) {
                console.log(err.message);
                const response = {
                    statusCode: 400,
                    error: err,
                    data: null
                }
                res.json(response);
            }
            const response = {
                statusCode: 200,
                message: success,
                data: {
                    fromAsyncSeries: results.toString()
                }
            }
            res.json(response);
        });
}