const fs = require('fs');

module.exports = readFilePromise;

//Promise Object for reading file
function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, {}, (err, content) => {
            if (err) {
                console.log(err.message);
                reject(err.message);
            } else {
                resolve(content);
            }
        });
    });
}