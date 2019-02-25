
//Requiring promise object
const readFilePromise = require('./readFilePromise');

module.exports = readFileGenFunc;

//File reading with Generator function
function* readFileGenFunc(filenameArray) {
    let i = 0;
    while (i != 3) {
        yield readFilePromise("./files/"+filenameArray[i] + ".txt");
        i++;
    }
}