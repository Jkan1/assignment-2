const fs = require('fs');

module.exports = callbackReadFileFunction;

//Reading File contents with Simple Callback functions
function callbackReadFileFunction(req, res) {
    let totalContent = "";
    fs.readFile("./files/" + req.params.one + ".txt", {}, (err, contentOne) => {
        if (err) {
            console.log(err.message);
            const response = {
                statusCode: 400,
                error: err.message,
                data: null
            }
            res.json(response);
        } else {
            totalContent += contentOne;
            fs.readFile("./files/" + req.params.two + ".txt", {}, (err, contentTwo) => {
                if (err) {
                    console.log(err.message);
                    const response = {
                        statusCode: 400,
                        error: err.message,
                        data: null
                    }
                    res.json(response);
                } else {
                    totalContent += contentTwo;
                    fs.readFile("./files/" + req.params.three + ".txt", {}, (err, contentThree) => {
                        if (err) {
                            console.log(err.message);
                            const response = {
                                statusCode: 400,
                                error: err.message,
                                data: null
                            }
                            res.json(response);
                        } else {
                            totalContent += contentThree;
                            const response = {
                                statusCode: 200,
                                message: "success",
                                data: {
                                    fromCallback: totalContent
                                }
                            }
                            res.json(response);
                        }
                    });
                }
            });
        }
    });
}